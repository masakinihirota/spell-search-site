"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

type Spell = {
  名前: string;
  必要な歌の段: string;
  唱える段の順番: string;
};

type SpellCategory = {
  [category: string]: Spell[];
};

export default function SpellListPage() {
  const [spells, setSpells] = useState<SpellCategory | null>(null);

  useEffect(() => {
    // spells.jsonを読み込む
    fetch("/data/spells.json")
      .then((response) => response.json())
      .then((data) => setSpells(data.spells))
      .catch((error) => console.error("データの読み込みに失敗しました:", error));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto p-4 text-gray-700">
        <h1 className="text-2xl font-bold mb-4">呪文一覧</h1>
        {spells ? (
          Object.entries(spells).map(([category, spellList]) => (
            <div key={category} className="mb-8">
              <h2 className="text-xl font-semibold mb-2">{category}</h2>
              <ul className="list-disc pl-5">
                {spellList.map((spell, index) => (
                  <li key={index} className="mb-1">
                    <strong>{spell.名前}</strong> - 必要な歌の段: {spell.必要な歌の段}, 唱える段の順番: {spell.唱える段の順番}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>データを読み込んでいます...</p>
        )}
        <Link
          href="/"
          className="bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 transition-colors"
        >
          トップに戻る
        </Link>
      </div>
    </main>
  );
}
