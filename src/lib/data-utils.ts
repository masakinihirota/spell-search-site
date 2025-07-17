import fs from 'fs/promises';
import path from 'path';
import { SpellCast, ChatMessage } from '@/types';

/**
 * データファイルのパスを取得する
 * @param fileName ファイル名
 * @returns ファイルの絶対パス
 */
export function getDataFilePath(fileName: string): string {
  return path.join(process.cwd(), 'public', 'data', fileName);
}

/**
 * JSONファイルからデータを読み込む
 * @param fileName ファイル名
 * @returns 読み込んだデータ
 */
export async function readJsonFile<T>(fileName: string): Promise<T> {
  try {
    const filePath = getDataFilePath(fileName);
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents) as T;
  } catch (error) {
    console.error(`ファイル ${fileName}した:`, error);
    throw error;
  }
}

/**
 * JSONファイルにデータを書き込む
 * @param fileName ファイル名
 * @param data 書き込むデータ
 */
export async function writeJsonFile<T>(fileName: string, data: T): Promise<void> {
  try {
    const filePath = getDataFilePath(fileName);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error(`ファイル ${fileName} の書き込みに失敗しました:`, error);
    throw error;
  }
}

/**
 * スペルデータを全て取得する
 * @returns スペルデータの配列
 */
export async function getAllSpells(): Promise<SpellCast[]> {
  try {
    const data = await readJsonFile<{ spells: Record<string, SpellCast[]> }>('spells.json');

    // スペルデータがオブジェクトの場合（カテゴリごとの配列）、すべてのカテゴリの配列を結合
    if (data.spells && typeof data.spells === 'object' && !Array.isArray(data.spells)) {
      const allSpells: SpellCast[] = [];

      // 各カテゴリの配列を結合
      Object.entries(data.spells).forEach(([category, spellsInCategory]) => {
        // カテゴリ情報を追加
        const spellsWithCategory = spellsInCategory.map(spell => ({
          ...spell,
          id: spell.id || `spell_${spell.名前}_${Date.now()}`, // IDがない場合は生成
          name: spell.名前 || spell.name || '', // 名前フィールドの互換性
          requiredSong: spell.必要な歌の段 || spell.requiredSong || '', // 必要な歌の段フィールドの互換性
          castOrder: spell.唱える段の順番 || spell.castOrder || '', // 唱える段の順番フィールドの互換性
          category: category, // カテゴリ情報を追加
          effect: spell.effect || '', // 効果（存在しない場合は空文字）
          description: spell.description || '', // 説明（存在しない場合は空文字）
          tags: spell.tags || [], // タグ（存在しない場合は空配列）
          isPopular: spell.isPopular || false, // 人気かどうか（存在しない場合はfalse）
          spellSequence: spell.spellSequence || {
            boardNumbers: [],
            characterSets: []
          }, // 呪文の詳細な構成要素（存在しない場合は空オブジェクト）
          createdAt: spell.createdAt || new Date().toISOString(), // 作成日時（存在しない場合は現在時刻）
          updatedAt: spell.updatedAt || new Date().toISOString() // 更新日時（存在しない場合は現在時刻）
        }));

        allSpells.push(...spellsWithCategory);
      });

      return allSpells;
    }

    // 既に配列の場合はそのまま返す
    return Array.isArray(data.spells) ? data.spells : [];
  } catch (error) {
    console.error('スペルデータの取得に失敗しました:', error);
    return [];
  }
}

/**
 * IDによるスペルの取得
 * @param id スペルID
 * @returns スペルデータ、見つからない場合はnull
 */
export async function getSpellById(id: string): Promise<SpellCast | null> {
  try {
    const spells = await getAllSpells();
    return spells.find(spell => spell.id === id) || null;
  } catch (error) {
    console.error(`ID ${id} のスペル取得に失敗しました:`, error);
    return null;
  }
}

/**
 * 検索クエリに基づいてスペルを検索する
 * @param query 検索クエリ
 * @returns 検索結果のスペル配列
 */
export async function searchSpells(query: string): Promise<SpellCast[]> {
  try {
    if (!query.trim()) {
      return await getAllSpells();
    }

    const spells = await getAllSpells();
    const lowerQuery = query.toLowerCase();

    return spells.filter(spell =>
      spell.name.toLowerCase().includes(lowerQuery) ||
      spell.requiredSong.includes(lowerQuery) ||
      spell.castOrder.includes(lowerQuery) ||
      spell.effect.toLowerCase().includes(lowerQuery) ||
      spell.category.toLowerCase().includes(lowerQuery) ||
      spell.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  } catch (error) {
    console.error(`検索クエリ "${query}" でのスペル検索に失敗しました:`, error);
    return [];
  }
}

/**
 * 新しいスペルを追加する
 * @param newSpell 新しいスペルデータ
 * @returns 追加されたスペル
 */
export async function addSpell(newSpell: Omit<SpellCast, 'id' | 'createdAt' | 'updatedAt'>): Promise<SpellCast> {
  try {
    const data = await readJsonFile<{ spells: SpellCast[] }>('spells.json');

    const now = new Date().toISOString();
    const id = `spell_${Date.now()}`;

    const spell: SpellCast = {
      ...newSpell,
      id,
      createdAt: now,
      updatedAt: now
    };

    data.spells.push(spell);
    await writeJsonFile('spells.json', data);

    return spell;
  } catch (error) {
    console.error('スペルの追加に失敗しました:', error);
    throw error;
  }
}

/**
 * スペルを更新する
 * @param id スペルID
 * @param updatedSpell 更新するスペルデータ
 * @returns 更新されたスペル、見つからない場合はnull
 */
export async function updateSpell(id: string, updatedSpell: Partial<SpellCast>): Promise<SpellCast | null> {
  try {
    const data = await readJsonFile<{ spells: SpellCast[] }>('spells.json');
    const spellIndex = data.spells.findIndex(spell => spell.id === id);

    if (spellIndex === -1) {
      return null;
    }

    data.spells[spellIndex] = {
      ...data.spells[spellIndex],
      ...updatedSpell,
      updatedAt: new Date().toISOString()
    };

    await writeJsonFile('spells.json', data);
    return data.spells[spellIndex];
  } catch (error) {
    console.error(`ID ${id} のスペル更新に失敗しました:`, error);
    throw error;
  }
}

/**
 * スペルを削除する
 * @param id スペルID
 * @returns 削除が成功したかどうか
 */
export async function deleteSpell(id: string): Promise<boolean> {
  try {
    const data = await readJsonFile<{ spells: SpellCast[] }>('spells.json');
    const spellIndex = data.spells.findIndex(spell => spell.id === id);

    if (spellIndex === -1) {
      return false;
    }

    data.spells.splice(spellIndex, 1);
    await writeJsonFile('spells.json', data);
    return true;
  } catch (error) {
    console.error(`ID ${id} のスペル削除に失敗しました:`, error);
    throw error;
  }
}

/**
 * チャットメッセージを全て取得する
 * @returns メッセージの配列
 */
export async function getAllMessages(): Promise<ChatMessage[]> {
  try {
    const data = await readJsonFile<{ messages: ChatMessage[] }>('messages.json');
    return data.messages;
  } catch (error) {
    console.error('メッセージの取得に失敗しました:', error);
    return [];
  }
}

/**
 * 新しいメッセージを追加する
 * @param newMessage 新しいメッセージデータ
 * @returns 追加されたメッセージ
 */
export async function addMessage(newMessage: Omit<ChatMessage, 'id' | 'timestamp'>): Promise<ChatMessage> {
  try {
    const data = await readJsonFile<{ messages: ChatMessage[] }>('messages.json');

    const message: ChatMessage = {
      ...newMessage,
      id: `msg_${Date.now()}`,
      timestamp: new Date().toISOString()
    };

    data.messages.push(message);
    await writeJsonFile('messages.json', data);

    return message;
  } catch (error) {
    console.error('メッセージの追加に失敗しました:', error);
    throw error;
  }
}

/**
 * メッセージを削除する
 * @param id メッセージID
 * @returns 削除が成功したかどうか
 */
export async function deleteMessage(id: string): Promise<boolean> {
  try {
    const data = await readJsonFile<{ messages: ChatMessage[] }>('messages.json');
    const messageIndex = data.messages.findIndex(message => message.id === id);

    if (messageIndex === -1) {
      return false;
    }

    data.messages.splice(messageIndex, 1);
    await writeJsonFile('messages.json', data);
    return true;
  } catch (error) {
    console.error(`ID ${id} のメッセージ削除に失敗しました:`, error);
    throw error;
  }
}

/**
 * 特定のスペルに関連するメッセージを取得する
 * @param spellId スペルID
 * @returns 関連するメッセージの配列
 */
export async function getMessagesBySpellId(spellId: string): Promise<ChatMessage[]> {
  try {
    const messages = await getAllMessages();
    return messages.filter(message => message.relatedSpellId === spellId);
  } catch (error) {
    console.error(`スペルID ${spellId} に関連するメッセージの取得に失敗しました:`, error);
    return [];
  }
}

/**
 * データディレクトリが存在しない場合は作成する
 */
export async function ensureDataDirectory(): Promise<void> {
  try {
    const dataDir = path.join(process.cwd(), 'public', 'data');
    await fs.mkdir(dataDir, { recursive: true });
  } catch (error) {
    console.error('データディレクトリの作成に失敗しました:', error);
    throw error;
  }
}

/**
 * 初期データファイルを作成する
 */
export async function createInitialDataFiles(): Promise<void> {
  try {
    await ensureDataDirectory();

    // spells.json が存在しない場合は作成
    try {
      await fs.access(getDataFilePath('spells.json'));
    } catch {
      await writeJsonFile('spells.json', { spells: [] });
    }

    // messages.json が存在しない場合は作成
    try {
      await fs.access(getDataFilePath('messages.json'));
    } catch {
      await writeJsonFile('messages.json', { messages: [] });
    }

    // config.json が存在しない場合は作成
    try {
      await fs.access(getDataFilePath('config.json'));
    } catch {
      await writeJsonFile('config.json', {
        popularSpells: [],
        settings: {
          maxMessagesPerUser: 100,
          maxMessageLength: 500
        }
      });
    }
  } catch (error) {
    console.error('初期データファイルの作成に失敗しました:', error);
    throw error;
  }
}
