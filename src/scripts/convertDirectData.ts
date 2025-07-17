import fs from 'fs/promises';
import path from 'path';
import { SpellCast } from '@/types';

/**
 * スペルデータを直接変換するスクリプト
 * スペルトナエル.jsonが見つからない場合に使用
 */
async function convertDirectData() {
  try {
    console.log('スペルデータの直接変換を開始します...');

    // スペルデータの元データ（スペルトナエル.jsonの内容を直接埋め込み）
    const sourceData = {
      "攻撃魔法": [
        {
          "名前": "パンチ",
          "必要な歌の段": "147",
          "唱える段の順番": "714"
        },
        {
          "名前": "キック",
          "必要な歌の段": "28",
          "唱える段の順番": "282"
        },
        {
          "名前": "ニャラ",
          "必要な歌の段": "258",
          "唱える段の順番": "582"
        },
        {
          "名前": "ファイア",
          "必要な歌の段": "168",
          "唱える段の順番": "6811"
        },
        {
          "名前": "ブリザード",
          "必要な歌の段": "24568",
          "唱える段の順番": "62485"
        },
        {
          "名前": "サンダー",
          "必要な歌の段": "247",
          "唱える段の順番": "7247"
        }
      ],
      "回復 体力上昇魔法": [
        {
          "名前": "ホミィ",
          "必要な歌の段": "678",
          "唱える段の順番": "678"
        },
        {
          "名前": "ヒール",
          "必要な歌の段": "268",
          "唱える段の順番": "682"
        },
        {
          "名前": "キュア",
          "必要な歌の段": "128",
          "唱える段の順番": "281"
        }
      ],
      "防御力上昇魔法": [
        {
          "名前": "ガード",
          "必要な歌の段": "358",
          "唱える段の順番": "385"
        },
        {
          "名前": "シールド",
          "必要な歌の段": "2358",
          "唱える段の順番": "3825"
        },
        {
          "名前": "プロテクト",
          "必要な歌の段": "247",
          "唱える段の順番": "72424"
        }
      ],
      "ボーナス上昇魔法": [
        {
          "名前": "ボナス",
          "必要な歌の段": "356",
          "唱える段の順番": "653"
        },
        {
          "名前": "マネー",
          "必要な歌の段": "578",
          "唱える段の順番": "758"
        }
      ]
    };

    const spells: SpellCast[] = [];
    let spellId = 1;

    // 各カテゴリのスペルを処理
    for (const [category, categorySpells] of Object.entries(sourceData)) {
      if (Array.isArray(categorySpells)) {
        for (const spell of categorySpells) {
          // スペルデータを変換
          const spellCast: SpellCast = {
            id: `spell_${spellId++}`,
            name: spell.名前,
            requiredSong: spell.必要な歌の段,
            castOrder: spell.唱える段の順番,
            effect: generateEffectDescription(category, spell.名前),
            description: generateDescription(category, spell.名前, spell.必要な歌の段, spell.唱える段の順番),
            category,
            tags: generateTags(category, spell.名前),
            isPopular: isPopularSpell(spell.名前),
            spellSequence: {
              boardNumbers: spell.必要な歌の段.split('').map(Number),
              characterSets: generateCharacterSets(spell.必要な歌の段)
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };

          spells.push(spellCast);
        }
      }
    }

    // データディレクトリが存在しない場合は作成
    const dataDir = path.join(process.cwd(), 'public', 'data');
    await fs.mkdir(dataDir, { recursive: true });

    // スペルデータをJSONファイルに保存
    const filePath = path.join(dataDir, 'spells.json');
    await fs.writeFile(filePath, JSON.stringify({ spells }, null, 2), 'utf8');

    console.log(`${spells.length}件のスペルデータを保存しました`);
  } catch (error) {
    console.error('スペルデータの変換に失敗しました:', error);
    process.exit(1);
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
 * @paracastOrder 唱える段の順番
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
 * @returns タグの配列
 */
function generateTags(category: string, name: string): string[] {
  const tags = [category];

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

// スクリプトを実行
convertDirectData();
