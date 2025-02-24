import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { prefecture, location, type, amount, isSpecial, position } = body;

    console.log("📡 Gemini APIにリクエスト:", { prefecture, location, type, amount, isSpecial, position });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("❌ APIキーが設定されていません");
      return NextResponse.json({ error: "APIキーが設定されていません" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // 収入なら +, 支出なら - の符号を付ける
    const sign = type === "income" ? "+" : "-";
    const specialText = isSpecial ? "特別イベント" : "通常イベント";

    // プロンプト (関西弁でイベントを生成, 最後に±金額)
    const prompt = `
あなたは関西すごろくゲームのゲームマスターです。以下の情報を踏まえて、ユニークな関西弁のイベントを一つ生成してください:
- 場所: ${prefecture}の${location} (マス${position}番)
- イベント種別: ${type === "income" ? "収入" : "支出"}
- 金額: ${amount}円 (最後に「${sign}${amount}円」と記載)
- ${specialText}

3行程度で関西弁を交えたイベント文言を作り、必ず最後に「${sign}${amount}円」と書いてください。
`.trim();

    const response = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = response.response.candidates[0]?.content?.parts[0]?.text?.trim();
    if (!text) {
      throw new Error("❌ Gemini APIのレスポンスが無効です");
    }

    console.log("🎉 生成されたイベント:", text);

    return NextResponse.json({ event: text });
  } catch (error) {
    console.error("❌ Gemini APIのエラー:", error);
    return NextResponse.json({ error: "イベント生成に失敗しました" }, { status: 500 });
  }
}
