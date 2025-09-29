#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * チェックボックス進捗のHTMLダッシュボードを生成するスクリプト
 */

function generateProgressBar(percentage) {
  const width = Math.round(percentage);
  const color = percentage >= 80 ? '#4caf50' : percentage >= 50 ? '#ff9800' : '#f44336';
  
  return `
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${width}%; background-color: ${color}"></div>
      <span class="progress-text">${percentage}%</span>
    </div>
  `;
}

function generateFileCard(file) {
  const progressBar = generateProgressBar(file.completionRate);
  const pendingTasks = file.checkboxes.filter(cb => !cb.checked);
  
  return `
    <div class="file-card">
      <h3>${file.path}</h3>
      <div class="file-stats">
        <span class="stat">完了: ${file.completed}/${file.total}</span>
        ${progressBar}
      </div>
      
      ${pendingTasks.length > 0 ? `
        <details class="pending-tasks">
          <summary>未完了タスク (${pendingTasks.length})</summary>
          <ul>
            ${pendingTasks.map(task => `
              <li>
                <span class="line-number">L${task.line}</span>
                <span class="task-text">${task.text}</span>
              </li>
            `).join('')}
          </ul>
        </details>
      ` : '<p class="all-done">✅ すべてのタスクが完了しています！</p>'}
    </div>
  `;
}

function generateDashboard(reportData) {
  const lastUpdated = new Date(reportData.timestamp).toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  const overallProgress = generateProgressBar(reportData.summary.completionRate);

  return `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>プロジェクト進捗ダッシュボード</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
            line-height: 1.6;
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
        }
        
        .header {
            text-align: center;
            margin-bottom: 40px;
        }
        
        .header h1 {
            font-size: 2.5rem;
            color: #2c3e50;
            margin-bottom: 10px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .last-updated {
            color: #666;
            font-size: 0.9rem;
        }
        
        .summary {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .summary h2 {
            font-size: 1.8rem;
            margin-bottom: 20px;
        }
        
        .summary-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .summary-stat {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            padding: 15px;
        }
        
        .summary-stat .number {
            font-size: 2rem;
            font-weight: bold;
            display: block;
        }
        
        .summary-stat .label {
            font-size: 0.9rem;
            opacity: 0.9;
        }
        
        .progress-bar {
            position: relative;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 25px;
            height: 20px;
            margin: 10px 0;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            border-radius: 25px;
            transition: width 0.3s ease;
        }
        
        .progress-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 0.8rem;
            font-weight: bold;
            color: white;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }
        
        .files-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 25px;
        }
        
        .file-card {
            background: white;
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(0, 0, 0, 0.05);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .file-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }
        
        .file-card h3 {
            color: #2c3e50;
            margin-bottom: 15px;
            font-size: 1.2rem;
            display: flex;
            align-items: center;
        }
        
        .file-card h3:before {
            content: "📄";
            margin-right: 10px;
        }
        
        .file-stats {
            margin-bottom: 20px;
        }
        
        .stat {
            display: inline-block;
            background: #e3f2fd;
            color: #1976d2;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 500;
            margin-bottom: 10px;
        }
        
        .pending-tasks {
            margin-top: 15px;
        }
        
        .pending-tasks summary {
            cursor: pointer;
            font-weight: 500;
            color: #e91e63;
            margin-bottom: 10px;
            padding: 8px;
            background: #fce4ec;
            border-radius: 8px;
            transition: background 0.3s ease;
        }
        
        .pending-tasks summary:hover {
            background: #f8bbd9;
        }
        
        .pending-tasks ul {
            list-style: none;
            margin-left: 0;
        }
        
        .pending-tasks li {
            padding: 8px 12px;
            border-left: 3px solid #e91e63;
            margin: 5px 0;
            background: #fafafa;
            border-radius: 0 8px 8px 0;
        }
        
        .line-number {
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 0.8rem;
            background: #e91e63;
            color: white;
            padding: 2px 6px;
            border-radius: 4px;
            margin-right: 10px;
        }
        
        .task-text {
            color: #555;
        }
        
        .all-done {
            text-align: center;
            color: #4caf50;
            font-weight: 500;
            font-size: 1.1rem;
            padding: 15px;
            background: #e8f5e8;
            border-radius: 10px;
        }
        
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
            .files-grid {
                grid-template-columns: 1fr;
            }
            
            .summary-stats {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .header h1 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📋 プロジェクト進捗ダッシュボード</h1>
            <div class="last-updated">最終更新: ${lastUpdated}</div>
        </div>
        
        <div class="summary">
            <h2>全体進捗</h2>
            <div class="summary-stats">
                <div class="summary-stat">
                    <span class="number">${reportData.summary.total}</span>
                    <span class="label">総タスク数</span>
                </div>
                <div class="summary-stat">
                    <span class="number">${reportData.summary.completed}</span>
                    <span class="label">完了済み</span>
                </div>
                <div class="summary-stat">
                    <span class="number">${reportData.summary.pending}</span>
                    <span class="label">未完了</span>
                </div>
                <div class="summary-stat">
                    <span class="number">${reportData.summary.completionRate}%</span>
                    <span class="label">進捗率</span>
                </div>
            </div>
            ${overallProgress}
        </div>
        
        <div class="files-grid">
            ${reportData.files.map(file => generateFileCard(file)).join('')}
        </div>
        
        <div class="footer">
            <p>🤖 このダッシュボードは GitHub Actions により自動生成されました</p>
        </div>
    </div>
</body>
</html>
  `;
}

// メイン実行部分
if (require.main === module) {
  try {
    const reportPath = process.argv[2] || 'checkbox-report.json';
    
    if (!fs.existsSync(reportPath)) {
      console.error('❌ レポートファイルが見つかりません:', reportPath);
      process.exit(1);
    }
    
    const reportData = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    const dashboard = generateDashboard(reportData);
    
    const outputPath = 'dashboard.html';
    fs.writeFileSync(outputPath, dashboard);
    
    console.log(`✅ ダッシュボードを ${outputPath} に生成しました`);
    
  } catch (error) {
    console.error('❌ ダッシュボード生成エラー:', error.message);
    process.exit(1);
  }
}

module.exports = { generateDashboard };