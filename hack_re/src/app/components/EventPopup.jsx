"use client";

import React from "react";

export default function EventPopup({ event, onClose }) {
  // イベント文言がない場合は表示しない
  if (!event) return null;

  // "event" 例: "今日は大阪城でめっちゃ儲かったわ！\n+30,000円"
  // 1. 正規表現で末尾の「±金額円」を抽出 (+xxxx円 or -xxxx円)
  const regex = new RegExp(`([+-])(\\d+(?:,\\d{3})*)円$`); 
  const match = event.match(regex);

  // 2. 初期値を用意
  let sign = null;
  let amountStr = null;

  // match があれば、sign("+/-") と数字部分を取得
  if (match) {
    sign = match[1];      // "+" or "-"
    amountStr = match[2]; // "30000" or "30,000" など
  }

  // 3. 色判定 (プラス→青, マイナス→赤)
  let colorClass = "";
  let displayAmount = "";
  if (sign && amountStr) {
    colorClass = (sign === "+") ? "text-blue-600" : "text-red-600";
    displayAmount = `${sign}${amountStr}円`;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
        <h2 className="text-xl font-bold mb-4">イベント発生！</h2>

        {/* イベント文言をそのまま表示 */}
        <p className="text-lg whitespace-pre-line mb-4">{event}</p>

        {/* 末尾に ±金額円 が含まれていた場合、下部に色付きで強調表示 */}
        {sign && amountStr && (
          <p className={`text-xl font-bold ${colorClass}`}>
            {displayAmount}
          </p>
        )}

        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
        >
          OK
        </button>
      </div>
    </div>
  );
}
