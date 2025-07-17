// スペルデータ.mdからJSONデータを生成するスクリプト
const fs = require('fs');
const path = require('path');

/**
 * スペルデータ.mdからJSONデータを生成するスクリプト
 */

// スペルデータ.mdファイルを読み込む
function readSpellDataMd() {
  const filePath = path.join(__dirname, '..', 'スペルデータ.md');
  return fs.readFileSync(filePath, 'utf8');
}

// Markdownからカテゴリーとスペルデータを抽出
function parseSpellData(markdown) {
  const categories = {};
  let currentCategory = '';
  let inTable = false;

  const lines = markdown.split('\n');

  for (const line of lines) {
    // カテゴリー見出しの検出
    if (line.startsWith('## ')) {
      currentCategory = line.substring(3).trim();
      categories[currentCategory] = [];
      inTable = false;
      continue;
    }

    // テーブルヘッダーの検出
    if (line.includes('| 名前 ') && line.includes('| 必要な歌の段 ') && line.includes('| 唱える段の順番 |')) {
      inTable = true;
      continue;
    }

    // テーブル区切り行をスキップ
    if (line.includes('| :---')) {
      continue;
    }

    // テーブル行の処理
    if (inTable && line.startsWith('| ') && line.includes(' | ')) {
      const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);

      if (cells.length === 3) {
        const spell = {
          名前: cells[0],
          必要な歌の段: cells[1],
          唱える段の順番: cells[2]
        };

        categories[currentCategory].push(spell);
      }
    }

    // セクション区切りの検出
    if (line.startsWith('---')) {
      inTable = false;
    }
  }

  return categories;
}

// JSONファイルを作成
function createJsonFile(data) {
  // データディレクトリの確認
  const dataDir = path.join(__dirname, 'public', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const filePath = path.join(dataDir, 'spells.json');
  fs.writeFileSync(filePath, JSON.stringify({ spells: data }, null, 2), 'utf8');

  console.log(`スペルデータをJSONに変換しました: ${filePath}`);
}

// メイン処理
try {
  const markdown = readSpellDataMd();
  const spellData = parseSpellData(markdown);
  createJsonFile(spellData);
} catch (error) {
  console.error('スペルデータの変換に失敗しました:', error);
  process.exit(1);
}
