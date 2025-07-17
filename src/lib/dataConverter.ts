import fs from 'fs/promises';
import path from 'path';
import { SpellData } from '@/types';

/**
 * スペルトナエル.jsonからデータを読み込み、アプリケーションで使用する形式に変換する
 * @returns 変換されたスペルデータの配列
 */
export async function convertSpellData(): Promise<SpellData[]> {
  try {
    // スペルトナエル.jsonのパスを取得（複数の可能性を試す）
    const possiblePaths = [
      path.join(process.cwd(), '..', 'スペルデータ.json'),
      path.join(process.cwd(), 'スペルデータ.json'),
      path.join(process.cwd(), '..', '..', 'スペルデータ.json')
    ];

    console.log('スペルデータの読み込みを試みます...');

    let fileContents = null;
    let usedPath = '';

    // 複数のパスを順番に試す
    for (const p of possiblePaths) {
      try {
        console.log(`パスを試行: ${p}`);
        fileContents = await fs.readFile(p, 'utf8');
        usedPath = p;
        console.log(`スペルデータを読み込みました: ${p}`);
        break;
      } catch (err) {
        console.log(`パス ${p} からの読み込みに失敗しました`);
      }
    }

    if (!fileContents) {
      throw new Error('スペルデータファイルが見つかりませんでした');
    }

    const sourceData = JSON.parse(fileContents);

    const spells: SpellData[] = [];
    let spellId = 1;

    // 各カテゴリのスペルを処理
    for (const [categoryWithTag, categorySpells] of Object.entries(sourceData)) {
      if (Array.isArray(categorySpells)) {
        // カテゴリとタグを分離（例: "弱点魔法 ダメージ" -> カテゴリ: "弱点魔法", タグ: "ダメージ"）
        const [category, tag] = categoryWithTag.split(' ');

        for (const spell of categorySpells) {
          // スペルデータを変換
          const spellData: SpellData = {
            id: `spell_${spellId++}`,
            名前: spell.名前,
            必要な歌の段: spell.必要な歌の段の数字 || spell.必要な歌の段,
            唱える段の順番: spell.取得する段の順 || spell.唱える段の順番,
            カテゴリ: category,
            説明: generateDescription(category, spell.名前, spell.必要な歌の段の数字 || spell.必要な歌の段, spell.取得する段の順 || spell.唱える段の順番),
            タグ: generateTags(category, spell.名前, tag)
          };

          spells.push(spellData);
        }
      }
    }

    return spells;
  } catch (error) {
    console.error('スペルデータの変換に失敗しました:', error);
    throw error;
  }
}

/**
 * カテゴリと呪文名から効果の説明を生成する
 * @param category カテゴリ
 * @param name 呪文名
 * @returns 効果の説明
 */
function generateEffectDescription(category: string, name: string): string {
  switch (category) {
    case '攻撃魔法':
      return `敵に${name}の攻撃魔法を放ち、ダメージを与える`;
    case '弱点魔法':
      return `敵の弱点を突き、${name}効果で大ダメージを与える`;
    case '雷攻撃魔法':
      return `敵に${name}の雷攻撃魔法を放ち、雷属性のダメージを与える`;
    case '炎攻撃魔法':
      return `敵に${name}の炎攻撃魔法を放ち、炎属性のダメージを与える`;
    case '氷攻撃魔法':
      return `敵に${name}の氷攻撃魔法を放ち、氷属性のダメージを与える`;
    case '風攻撃魔法':
      return `敵に${name}の風攻撃魔法を放ち、風属性のダメージを与える`;
    case '重力攻撃魔法':
      return `敵に${name}の重力攻撃魔法を放ち、重力属性のダメージを与える`;
    case '特殊攻撃魔法':
      return `敵に${name}の特殊攻撃魔法を放ち、特殊効果のダメージを与える`;
    case '能力値変更':
      return `${name}の効果で能力値をリセットする`;
    case '攻撃力上昇魔法':
      return `${name}の効果で攻撃力を上昇させる`;
    case '防御力上昇魔法':
      return `${name}の効果で防御力を上昇させる`;
    case '回復 体力上昇魔法':
      return `${name}の効果で体力を回復または上昇させる`;
    case '特殊能力上昇魔法':
      return `${name}の効果で特殊能力を上昇させる`;
    case '動物召喚魔法':
      return `${name}を召喚して戦闘を支援する`;
    case '精霊召喚魔法':
      return `${name}の精霊を召喚して特殊効果を発動する`;
    case '移動速度上昇魔法':
      return `${name}の効果で移動速度を上昇させる`;
    case 'ボーナス上昇魔法':
      return `${name}の効果でボーナスを上昇させる`;
    default:
      return `${name}の効果を発動する`;
  }
}

/**
 * 詳細説明を生成する
 * @param category カテゴリ
 * @param name 呪文名
 * @param requiredSong 必要な歌の段
 * @param castOrder 唱える段の順番
 * @returns 詳細説明
 */
function generateDescription(category: string, name: string, requiredSong: string, castOrder: string): string {
  const difficulty = requiredSong.length <= 3 ? '初級' : requiredSong.length <= 5 ? '中級' : '上級';
  const castLength = castOrder.length <= 4 ? '短い' : castOrder.length <= 7 ? '標準的な' : '長い';

  return `${name}は${category}に分類される${difficulty}レベルの呪文です。詠唱には${requiredSong}の段を使用し、${castLength}詠唱順序で発動します。この呪文は${generateEffectDescription(category, name).toLowerCase()}。`;
}

/**
 * タグを生成する
 * @param category カテゴリ
 * @param name 呪文名
 * @param tag JSONから取得したタグ
 * @returns タグの配列
 */
function generateTags(category: string, name: string, tag?: string): string[] {
  const tags = [category];

  // JSONから取得したタグを追加
  if (tag) {
    tags.push(tag);
  }

  // カテゴリに基づいたタグを追加
  if (category.includes('攻撃')) {
    tags.push('攻撃');
  }
  if (category.includes('回復')) {
    tags.push('回復');
  }
  if (category.includes('上昇')) {
    tags.push('バフ');
  }
  if (category.includes('召喚')) {
    tags.push('召喚');
  }

  // 名前に基づいたタグを追加
  if (name.length <= 3) {
    tags.push('短名前');
  }
  if (name.length >= 7) {
    tags.push('長名前');
  }

  return tags;
}

/**
 * 人気のある呪文かどうかを判定する
 * @param name 呪文名
 * @returns 人気のある呪文かどうか
 */
function isPopularSpell(name: string): boolean {
  // 人気のある呪文のリスト（仮）
  const popularSpells = [
    'ファイア', 'ブリザード', 'サンダー', 'キュア', 'ホミィ', 'ヒール',
    'プロテクト', 'シールド', 'ガード', 'ボナス', 'マネー'
  ];

  return popularSpells.includes(name);
}

/**
 * 必要な歌の段から文字セットを生成する
 * @param requiredSong 必要な歌の段
 * @returns 文字セットの配列
 */
function generateCharacterSets(requiredSong: string): string[] {
  const characterSets: string[] = [];
  const rows = [
    'アイウエオヤユヨワン',
    'カキクケコラリルレロ',
    'サシスセソガギグゲゴ',
    'タチツテトザジズゼゾ',
    'ナニヌネノダヂヅデド',
    'ハヒフヘホバビブベボ',
    'マミムメモパピプペポ',
    'ァィゥェォッャュョー'
  ];

  for (const digit of requiredSong) {
    const rowIndex = parseInt(digit) - 1;
    if (rowIndex >= 0 && rowIndex < rows.length) {
      characterSets.push(rows[rowIndex]);
    }
  }

  return characterSets;
}

/**
 * スペルデータをJSONファイルに保存する
 * @param spells スペルデータの配列
 */
export async function saveSpellData(spells: SpellData[]): Promise<void> {
  try {
    const dataDir = path.join(process.cwd(), 'public', 'data');

    // データディレクトリが存在しない場合は作成
    await fs.mkdir(dataDir, { recursive: true });

    // スペルデータをJSONファイルに保存
    const filePath = path.join(dataDir, 'spells.json');
    await fs.writeFile(filePath, JSON.stringify({ spells }, null, 2), 'utf8');

    console.log(`${spells.length}件のスペルデータを保存しました`);
  } catch (error) {
    console.error('スペルデータの保存に失敗しました:', error);
    throw error;
  }
}
