import { convertSpellData, saveSpellData } from '../lib/dataConverter';

/**
 * スペルデータを変換して保存するスクリプト
 */
async function main() {
  try {
    console.log('スペルデータの変換を開始します...');

    // スペルデータを変換
    const spells = await convertSpellData();
    console.log(`${spells.length}件のスペルデータを変換しました`);

    // 変換したデータを保存
    await saveSpellData(spells);

    console.log('スペルデータの変換が完了しました');
  } catch (error) {
    console.error('スペルデータの変換に失敗しました:', error);
    process.exit(1);
  }
}

// スクリプトを実行
main();
