#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

const {
  GH_TOKEN,
  GITHUB_TOKEN,
  PROJECT_ID,
  KEY_FIELD_ID,
  TITLE_FIELD_ID,
  STATUS_FIELD_ID,
  STATUS_TODO_OPTION_ID,
  STATUS_DONE_OPTION_ID,
  BODY_FIELD_ID,
  FILE_FIELD_ID,
  LINE_FIELD_ID,
  GITHUB_REPOSITORY,
  GITHUB_REF_NAME,
  GITHUB_SHA,
  GITHUB_SERVER_URL = 'https://github.com',
} = process.env;

const TOKEN = GH_TOKEN || GITHUB_TOKEN;

function assertEnv(value, name) {
  if (!value) {
    throw new Error(`環境変数 ${name} が設定されていません。`);
  }
}

async function graphqlRequest(query, variables = {}) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GraphQL リクエストに失敗しました: ${response.status} ${response.statusText} - ${text}`);
  }

  const result = await response.json();
  if (result.errors && result.errors.length > 0) {
    const messages = result.errors.map(err => err.message).join('\n');
    throw new Error(`GraphQL エラー: \n${messages}`);
  }

  return result.data;
}

function loadCheckboxReport() {
  const reportPath = path.resolve(process.cwd(), 'checkbox-report.json');

  if (!fs.existsSync(reportPath)) {
    console.log('⚠️ checkbox-report.json が見つかりません。Projects 同期をスキップします。');
    process.exit(0);
  }

  const raw = fs.readFileSync(reportPath, 'utf8');
  return JSON.parse(raw);
}

function buildTasksFromReport(report) {
  const tasks = [];
  const uniqueKeys = new Set();

  for (const file of report.files || []) {
    for (const checkbox of file.checkboxes || []) {
      const key = `${file.path}:L${checkbox.line}`;
      if (uniqueKeys.has(key)) {
        continue;
      }

      uniqueKeys.add(key);
      const title = checkbox.text ? checkbox.text.trim() : '(テキスト未設定)';
      const truncatedTitle = title.length > 240 ? `${title.slice(0, 237)}...` : title;

      const statusOptionId = checkbox.checked ? STATUS_DONE_OPTION_ID : STATUS_TODO_OPTION_ID;

      const bodyLines = [
        `- ファイル: ${file.path}`,
        `- 行番号: ${checkbox.line}`,
        `- 状態: ${checkbox.checked ? '✅ 完了' : '⬜️ 未完了'}`,
        '',
        checkbox.text ? checkbox.text : '(テキスト未設定)',
      ];

      const permalink = buildPermalink(file.path, checkbox.line);
      if (permalink) {
        bodyLines.splice(3, 0, `- リンク: ${permalink}`);
      }

      tasks.push({
        key,
        title: truncatedTitle,
        body: bodyLines.join('\n'),
        statusOptionId,
        filePath: file.path,
        line: checkbox.line,
        checked: checkbox.checked,
      });
    }
  }

  return tasks;
}

function buildPermalink(filePath, line) {
  if (!GITHUB_REPOSITORY) {
    return null;
  }

  const ref = GITHUB_SHA || GITHUB_REF_NAME || 'main';
  return `${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/blob/${ref}/${filePath}#L${line}`;
}

async function fetchExistingItems(projectId) {
  const items = [];
  let hasNextPage = true;
  let cursor = null;

  const query = `
    query($projectId: ID!, $after: String) {
      node(id: $projectId) {
        ... on ProjectV2 {
          items(first: 100, after: $after) {
            nodes {
              id
              fieldValues(first: 50) {
                nodes {
                  __typename
                  ... on ProjectV2ItemFieldTextValue {
                    text
                    field { id name }
                  }
                  ... on ProjectV2ItemFieldSingleSelectValue {
                    name
                    optionId
                    field { id name }
                  }
                  ... on ProjectV2ItemFieldNumberValue {
                    number
                    field { id name }
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    }
  `;

  while (hasNextPage) {
    const data = await graphqlRequest(query, { projectId, after: cursor });
    const projectNode = data?.node;

    if (!projectNode || !projectNode.items) {
      throw new Error('Projects 情報を取得できませんでした。Project ID を確認してください。');
    }

    const { nodes, pageInfo } = projectNode.items;
    items.push(...nodes);

    hasNextPage = pageInfo.hasNextPage;
    cursor = pageInfo.endCursor;
  }

  return items.map(item => {
    const fieldMap = new Map();
    for (const fieldValue of item.fieldValues.nodes) {
      if (!fieldValue?.field?.id) continue;
      switch (fieldValue.__typename) {
        case 'ProjectV2ItemFieldTextValue':
          fieldMap.set(fieldValue.field.id, { type: 'text', value: fieldValue.text || '' });
          break;
        case 'ProjectV2ItemFieldSingleSelectValue':
          fieldMap.set(fieldValue.field.id, {
            type: 'singleSelect',
            value: fieldValue.optionId,
            name: fieldValue.name || '',
          });
          break;
        case 'ProjectV2ItemFieldNumberValue':
          fieldMap.set(fieldValue.field.id, { type: 'number', value: fieldValue.number });
          break;
        default:
          break;
      }
    }

    return {
      id: item.id,
      fields: fieldMap,
    };
  });
}

async function ensureTextField(projectId, itemId, fieldId, value, currentValue = '') {
  if (!fieldId || value === undefined || value === null) return;
  if (value === currentValue) return;

  const mutation = `
    mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $value: String!) {
      updateProjectV2ItemFieldValue(input: {
        projectId: $projectId,
        itemId: $itemId,
        fieldId: $fieldId,
        value: { text: $value }
      }) {
        projectV2Item { id }
      }
    }
  `;

  await graphqlRequest(mutation, { projectId, itemId, fieldId, value });
}

async function ensureSingleSelectField(projectId, itemId, fieldId, optionId, currentOptionId = null) {
  if (!fieldId || !optionId) return;
  if (currentOptionId === optionId) return;

  const mutation = `
    mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $optionId: String!) {
      updateProjectV2ItemFieldValue(input: {
        projectId: $projectId,
        itemId: $itemId,
        fieldId: $fieldId,
        value: { singleSelectOptionId: $optionId }
      }) {
        projectV2Item { id }
      }
    }
  `;

  await graphqlRequest(mutation, { projectId, itemId, fieldId, optionId });
}

async function createDraftIssue(projectId, title, body) {
  const mutation = `
    mutation($projectId: ID!, $title: String!, $body: String) {
      createProjectV2DraftIssue(input: {
        projectId: $projectId,
        title: $title,
        body: $body
      }) {
        projectItem { id }
        draftIssue { id }
      }
    }
  `;

  const data = await graphqlRequest(mutation, { projectId, title, body });
  const draft = data?.createProjectV2DraftIssue;

  if (!draft) {
    throw new Error('Draft Issue の作成に失敗しました。');
  }

  const itemId = draft.projectItem?.id || null;
  const draftIssueId = draft.draftIssue?.id || null;

  let finalItemId = itemId;

  if (draftIssueId) {
    const addMutation = `
      mutation($projectId: ID!, $contentId: ID!) {
        addProjectV2ItemById(input: { projectId: $projectId, contentId: $contentId }) {
          item { id }
        }
      }
    `;

    try {
      const addResult = await graphqlRequest(addMutation, { projectId, contentId: draftIssueId });
      finalItemId = addResult?.addProjectV2ItemById?.item?.id || finalItemId;
    } catch (error) {
      const message = error.message || '';
      if (!message.includes('already a draft issue') && !message.includes('already exists')) {
        throw error;
      }
    }
  }

  if (!finalItemId) {
    throw new Error('Project item の作成に失敗しました。');
  }

  return finalItemId;
}

async function synchronize() {
  assertEnv(TOKEN, 'GH_TOKEN または GITHUB_TOKEN');
  assertEnv(PROJECT_ID, 'PROJECT_ID');
  assertEnv(KEY_FIELD_ID, 'KEY_FIELD_ID');
  assertEnv(TITLE_FIELD_ID, 'TITLE_FIELD_ID');
  assertEnv(STATUS_FIELD_ID, 'STATUS_FIELD_ID');
  assertEnv(STATUS_TODO_OPTION_ID, 'STATUS_TODO_OPTION_ID');
  assertEnv(STATUS_DONE_OPTION_ID, 'STATUS_DONE_OPTION_ID');

  const report = loadCheckboxReport();
  const tasks = buildTasksFromReport(report);

  if (tasks.length === 0) {
    console.log('ℹ️ チェックボックスが見つからなかったため、Projects 同期は不要です。');
    return;
  }

  console.log(`📦 Projects 同期対象: ${tasks.length} 件`);

  const existingItems = await fetchExistingItems(PROJECT_ID);
  const keyToItem = new Map();
  for (const item of existingItems) {
    const keyValue = item.fields.get(KEY_FIELD_ID)?.value;
    if (keyValue) {
      keyToItem.set(keyValue, item);
    }
  }

  let createdCount = 0;
  let updatedCount = 0;

  for (const task of tasks) {
    const existing = keyToItem.get(task.key);
    if (!existing) {
      console.log(`➕ 新規作成: ${task.key}`);
      const itemId = await createDraftIssue(PROJECT_ID, task.title, task.body);

      await ensureTextField(PROJECT_ID, itemId, KEY_FIELD_ID, task.key);
      await ensureTextField(PROJECT_ID, itemId, TITLE_FIELD_ID, task.title);
      await ensureSingleSelectField(PROJECT_ID, itemId, STATUS_FIELD_ID, task.statusOptionId);
      if (BODY_FIELD_ID) {
        await ensureTextField(PROJECT_ID, itemId, BODY_FIELD_ID, task.body);
      }
      if (FILE_FIELD_ID) {
        await ensureTextField(PROJECT_ID, itemId, FILE_FIELD_ID, task.filePath);
      }
      if (LINE_FIELD_ID) {
        await ensureTextField(PROJECT_ID, itemId, LINE_FIELD_ID, String(task.line));
      }

      keyToItem.set(task.key, {
        id: itemId,
        fields: new Map([
          [KEY_FIELD_ID, { type: 'text', value: task.key }],
          [TITLE_FIELD_ID, { type: 'text', value: task.title }],
          [STATUS_FIELD_ID, { type: 'singleSelect', value: task.statusOptionId }],
        ]),
      });

      createdCount += 1;
    } else {
      console.log(`🔄 更新: ${task.key}`);
      await ensureTextField(
        PROJECT_ID,
        existing.id,
        TITLE_FIELD_ID,
        task.title,
        existing.fields.get(TITLE_FIELD_ID)?.value || ''
      );
      await ensureTextField(
        PROJECT_ID,
        existing.id,
        KEY_FIELD_ID,
        task.key,
        existing.fields.get(KEY_FIELD_ID)?.value || ''
      );
      await ensureSingleSelectField(
        PROJECT_ID,
        existing.id,
        STATUS_FIELD_ID,
        task.statusOptionId,
        existing.fields.get(STATUS_FIELD_ID)?.value || null
      );
      if (BODY_FIELD_ID) {
        await ensureTextField(
          PROJECT_ID,
          existing.id,
          BODY_FIELD_ID,
          task.body,
          existing.fields.get(BODY_FIELD_ID)?.value || ''
        );
      }
      if (FILE_FIELD_ID) {
        await ensureTextField(
          PROJECT_ID,
          existing.id,
          FILE_FIELD_ID,
          task.filePath,
          existing.fields.get(FILE_FIELD_ID)?.value || ''
        );
      }
      if (LINE_FIELD_ID) {
        await ensureTextField(
          PROJECT_ID,
          existing.id,
          LINE_FIELD_ID,
          String(task.line),
          existing.fields.get(LINE_FIELD_ID)?.value || ''
        );
      }

      updatedCount += 1;
    }
  }

  console.log(`✅ Projects 同期完了: 新規 ${createdCount} 件, 更新 ${updatedCount} 件`);
}

synchronize().catch(error => {
  console.error('❌ Projects 同期でエラーが発生しました:', error.message);
  process.exit(1);
});
