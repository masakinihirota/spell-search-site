import { NextRequest, NextResponse } from "next/server";
import { getSpellById } from "@/lib/data-utils";

/**
 * 個別スペル詳細を取得するAPI
 * GET /api/spells/[id]
 */
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;

		if (!id) {
			return NextResponse.json(
				{ error: "スペルIDが指定されていません" },
				{ status: 400 },
			);
		}

		const spell = await getSpellById(id);

		if (!spell) {
			return NextResponse.json(
				{ error: "指定されたIDのスペルが見つかりません" },
				{ status: 404 },
			);
		}

		return NextResponse.json({ spell }, { status: 200 });
	} catch (error) {
		console.error(`スペル詳細の取得に失敗しました:`, error);
		return NextResponse.json(
			{ error: "スペル詳細の取得に失敗しました" },
			{ status: 500 },
		);
	}
}
