import { SpellCast } from "@/types";

/**
 * ひらがなをカタカナに変換する
 * @param text 変換するテキスト
 * @returns カタカナに変換されたテキスト
 */
export function hiraganaToKatakana(text: string): string {
	return text.replace(/[\u3041-\u3096]/g, (match) => {
		const chr = match.charCodeAt(0) + 0x60;
		return String.fromCharCode(chr);
	});
}

/**
 * カタカナをひらがなに変換する
 * @param text 変換するテキスト
 * @returns ひらがなに変換されたテキスト
 */
export function katakanaToHiragana(text: string): string {
	return text.replace(/[\u30A1-\u30F6]/g, (match) => {
		const chr = match.charCodeAt(0) - 0x60;
		return String.fromCharCode(chr);
	});
}

/**
 * 検索クエリに基づいてスペルをフィルタリングする
 * @param spells スペルの配列
 * @param query 検索クエリ
 * @returns フィルタリングされたスペルの配列
 */
export function filterSpells(spells: SpellCast[], query: string): SpellCast[] {
	if (!query.trim()) {
		return spells;
	}

	const lowerQuery = query.toLowerCase();
	const katakanaQuery = hiraganaToKatakana(lowerQuery);
	const hiraganaQuery = katakanaToHiragana(lowerQuery);

	return spells.filter((spell) => {
		// spell.nameがundefinedまたはnullの場合はスキップ
		if (!spell.name) return false;
		// 名前で検索（ひらがな/カタカナ対応）
		const nameLower = spell.name.toLowerCase() || '';
		const nameHiragana = katakanaToHiragana(nameLower);
		const nameKatakana = hiraganaToKatakana(nameLower);

		// 必要な歌の段、唱える段の順番で検索
		const requiredSongMatch = spell.requiredSong?.includes(lowerQuery);
		const castOrderMatch = spell.castOrder?.includes(lowerQuery);

		// 効果、カテゴリ、タグで検索
		const effectMatch =
			(spell.effect?.toLowerCase().includes(lowerQuery) ?? false) ||
			(spell.effect?.toLowerCase().includes(hiraganaQuery) ?? false) ||
			(spell.effect?.toLowerCase().includes(katakanaQuery) ?? false);

		const categoryMatch =
			spell.category?.toLowerCase().includes(lowerQuery) ||
			spell.category?.toLowerCase().includes(hiraganaQuery) ||
			spell.category?.toLowerCase().includes(katakanaQuery);

		const tagMatch = spell.tags.some(
			(tag) =>
				tag.toLowerCase().includes(lowerQuery) ||
				tag.toLowerCase().includes(hiraganaQuery) ||
				tag.toLowerCase().includes(katakanaQuery),
		);

		return (
			nameLower.includes(lowerQuery) ||
			nameHiragana.includes(hiraganaQuery) ||
			nameKatakana.includes(katakanaQuery) ||
			requiredSongMatch ||
			castOrderMatch ||
			effectMatch ||
			categoryMatch ||
			tagMatch
		);
	});
}

/**
 * スペルを関連度でソートする
 * @param spells スペルの配列
 * @param query 検索クエリ
 * @returns ソートされたスペルの配列
 */
export function sortSpellsByRelevance(
	spells: SpellCast[],
	query: string,
): SpellCast[] {
	if (!query.trim()) {
		return spells;
	}

	const lowerQuery = query.toLowerCase();
	const katakanaQuery = hiraganaToKatakana(lowerQuery);
	const hiraganaQuery = katakanaToHiragana(lowerQuery);

	return [...spells].sort((a, b) => {
		// nameがundefinedの場合の処理
		if (!a.name && !b.name) return 0;
		if (!a.name) return 1;
		if (!b.name) return -1;

		// 名前の完全一致を最優先
		const aNameLower = a.name.toLowerCase();
		const bNameLower = b.name.toLowerCase();

		const aNameExactMatch =
			aNameLower === lowerQuery ||
			katakanaToHiragana(aNameLower) === hiraganaQuery ||
			hiraganaToKatakana(aNameLower) === katakanaQuery;

		const bNameExactMatch =
			bNameLower === lowerQuery ||
			katakanaToHiragana(bNameLower) === hiraganaQuery ||
			hiraganaToKatakana(bNameLower) === katakanaQuery;

		if (aNameExactMatch && !bNameExactMatch) return -1;
		if (!aNameExactMatch && bNameExactMatch) return 1;

		// 名前の前方一致を次に優先
		const aNameStartsWith =
			aNameLower.startsWith(lowerQuery) ||
			katakanaToHiragana(aNameLower).startsWith(hiraganaQuery) ||
			hiraganaToKatakana(aNameLower).startsWith(katakanaQuery);

		const bNameStartsWith =
			bNameLower.startsWith(lowerQuery) ||
			katakanaToHiragana(bNameLower).startsWith(hiraganaQuery) ||
			hiraganaToKatakana(bNameLower).startsWith(katakanaQuery);

		if (aNameStartsWith && !bNameStartsWith) return -1;
		if (!aNameStartsWith && bNameStartsWith) return 1;

		// 必要な歌の段の完全一致を次に優先
		const aRequiredSongExactMatch = a.requiredSong === lowerQuery;
		const bRequiredSongExactMatch = b.requiredSong === lowerQuery;

		if (aRequiredSongExactMatch && !bRequiredSongExactMatch) return -1;
		if (!aRequiredSongExactMatch && bRequiredSongExactMatch) return 1;

		// 名前の長さが短い方を優先（シンプルな呪文を優先）
		return a.name.length - b.name.length;
	});
}

/**
 * 検索クエリに基づいてスペルを検索する
 * @param spells スペルの配列
 * @param query 検索クエリ
 * @returns 検索結果のスペルの配列
 */
export function searchSpells(spells: SpellCast[], query: string): SpellCast[] {
	const filteredSpells = filterSpells(spells, query);
	return sortSpellsByRelevance(filteredSpells, query);
}
