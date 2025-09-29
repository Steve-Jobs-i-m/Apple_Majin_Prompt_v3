#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * マークダウンファイル内のチェックボックスを検知し、進捗をトラッキングするスクリプト
 */

class CheckboxTracker {
  constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      summary: {
        total: 0,
        completed: 0,
        pending: 0,
        completionRate: 0
      },
      files: []
    };
  }

  /**
   * ディレクトリを再帰的に検索してマークダウンファイルを見つける
   */
  findMarkdownFiles(dirPath) {
    const markdownFiles = [];
    
    const traverse = (currentPath) => {
      const items = fs.readdirSync(currentPath);
      
      for (const item of items) {
        const fullPath = path.join(currentPath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          // node_modules, .git, .vscode等の除外
          if (!item.startsWith('.') && item !== 'node_modules') {
            traverse(fullPath);
          }
        } else if (stat.isFile() && item.endsWith('.md')) {
          markdownFiles.push(fullPath);
        }
      }
    };
    
    traverse(dirPath);
    return markdownFiles;
  }

  /**
   * マークダウンファイルからチェックボックスを抽出
   */
  extractCheckboxes(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    // Windows/Unix改行コードを正規化し、各行を綺麗にする
    const lines = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
    const checkboxes = [];

    // チェックボックスの正規表現パターン
    // - [ ] または - [x] または * [ ] または * [x]
    // より柔軟なパターンにして、空白文字のバリエーションにも対応
    const checkboxPattern = /^(\s*)([-*])\s*\[\s*([x×✓✗]?)\s*\]\s*(.+)$/i;

    lines.forEach((line, index) => {
      // 制御文字や不要な文字を除去
      const cleanLine = line.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '').trim();
      
      const match = cleanLine.match(checkboxPattern);
      if (match) {
        const [, indent, marker, checkState, text] = match;
        const isChecked = /[x×✓]/i.test(checkState);
        
        checkboxes.push({
          line: index + 1,
          indent: indent.length,
          marker: marker,
          checked: isChecked,
          text: text.trim(),
          rawLine: cleanLine
        });
      }
    });

    return checkboxes;
  }

  /**
   * ファイルのチェックボックス情報を分析
   */
  analyzeFile(filePath) {
    const relativePath = path.relative(process.cwd(), filePath);
    const checkboxes = this.extractCheckboxes(filePath);
    
    const completed = checkboxes.filter(cb => cb.checked).length;
    const total = checkboxes.length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      path: relativePath,
      absolutePath: filePath,
      total,
      completed,
      pending: total - completed,
      completionRate,
      checkboxes
    };
  }

  /**
   * すべてのマークダウンファイルを分析
   */
  analyzeProject(rootPath = '.') {
    console.log('🔍 マークダウンファイルを検索中...');
    const markdownFiles = this.findMarkdownFiles(rootPath);
    
    console.log(`📄 ${markdownFiles.length} 個のマークダウンファイルを発見`);

    for (const filePath of markdownFiles) {
      const fileAnalysis = this.analyzeFile(filePath);
      if (fileAnalysis.total > 0) {
        this.results.files.push(fileAnalysis);
        console.log(`  ✓ ${fileAnalysis.path}: ${fileAnalysis.completed}/${fileAnalysis.total} 完了 (${fileAnalysis.completionRate}%)`);
      }
    }

    // 全体サマリーの計算
    this.results.summary.total = this.results.files.reduce((sum, file) => sum + file.total, 0);
    this.results.summary.completed = this.results.files.reduce((sum, file) => sum + file.completed, 0);
    this.results.summary.pending = this.results.summary.total - this.results.summary.completed;
    this.results.summary.completionRate = this.results.summary.total > 0 
      ? Math.round((this.results.summary.completed / this.results.summary.total) * 100) 
      : 0;

    return this.results;
  }

  /**
   * 結果をJSONファイルに保存
   */
  saveResults(outputPath = 'checkbox-report.json') {
    fs.writeFileSync(outputPath, JSON.stringify(this.results, null, 2));
    console.log(`💾 レポートを ${outputPath} に保存しました`);
  }

  /**
   * コンソールに結果を表示
   */
  printSummary() {
    console.log('\n📋 チェックボックス進捗サマリー');
    console.log('================================');
    console.log(`総タスク数: ${this.results.summary.total}`);
    console.log(`完了済み: ${this.results.summary.completed}`);
    console.log(`未完了: ${this.results.summary.pending}`);
    console.log(`進捗率: ${this.results.summary.completionRate}%`);
    
    if (this.results.files.length > 0) {
      console.log('\n📁 ファイル別詳細:');
      this.results.files.forEach(file => {
        console.log(`  ${file.path}: ${file.completed}/${file.total} (${file.completionRate}%)`);
      });
    }
  }

  /**
   * 未完了タスクの詳細表示
   */
  printPendingTasks() {
    console.log('\n⏳ 未完了タスク一覧:');
    console.log('====================');
    
    this.results.files.forEach(file => {
      const pendingTasks = file.checkboxes.filter(cb => !cb.checked);
      if (pendingTasks.length > 0) {
        console.log(`\n📄 ${file.path}:`);
        pendingTasks.forEach(task => {
          console.log(`  L${task.line}: ${task.text}`);
        });
      }
    });
  }
}

// メイン実行部分
if (require.main === module) {
  const tracker = new CheckboxTracker();
  
  try {
    console.log('🚀 チェックボックストラッカーを開始します...\n');
    
    const results = tracker.analyzeProject();
    tracker.printSummary();
    tracker.printPendingTasks();
    tracker.saveResults();
    
    console.log('\n✅ 分析完了！');
    
  } catch (error) {
    console.error('❌ エラーが発生しました:', error.message);
    process.exit(1);
  }
}

module.exports = CheckboxTracker;