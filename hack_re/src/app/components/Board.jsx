"use client";

import React from "react";

export default function Board({ positions, players }) {
  const gridSize = 6;
  const board = Array.from({ length: gridSize * gridSize }, (_, i) => i);

  // position番号を都道府県や地名にマッピング
  const getPrefectureFromPosition = (position) => {
    if (position <= 5) return "大阪";
    if (position <= 11) return "京都";
    if (position <= 17) return "兵庫";
    if (position <= 23) return "滋賀";
    if (position <= 29) return "奈良";
    return "和歌山";
  };
  const getLocationFromPosition = (position) => {
    const locations = {
      大阪: ["大阪城", "通天閣", "USJ", "道頓堀", "天王寺", "梅田"],
      京都: ["金閣寺", "清水寺", "伏見稲荷", "嵐山", "二条城", "祇園"],
      兵庫: ["姫路城", "神戸港", "有馬温泉", "六甲山", "明石海峡大橋", "北野異人館"],
      滋賀: ["琵琶湖", "彦根城", "長浜", "比叡山", "近江八幡", "信楽"],
      奈良: ["東大寺", "奈良公園", "法隆寺", "春日大社", "平城宮跡", "吉野山"],
      和歌山: ["高野山", "白浜", "熊野古道", "和歌山城", "那智の滝", "円月島"],
    };
    const prefecture = getPrefectureFromPosition(position);
    return locations[prefecture][position % 6];
  };

  return (
    <div className="grid grid-cols-6 gap-1 bg-gray-200 p-4 rounded-lg">
      {board.map((position) => {
        // そのマスにいるプレイヤーを取得
        const playerIcons = Object.entries(positions)
          .filter(([_, pos]) => pos === position)
          .map(([playerId]) => (
            <span
              key={playerId}
              className="text-xs font-bold"
              style={{ color: players[playerId]?.color }} // ★プレイヤー色を文字色に
            >
              {`P${playerId}`}
            </span>
          ));

        const locationName = getLocationFromPosition(position);

        return (
          <div
            key={position}
            className="relative flex flex-col items-center justify-center
                       border border-gray-400 w-20 h-20 bg-white"
          >
            <span className="text-xs text-gray-700 text-center">{locationName}</span>
            <div className="absolute bottom-1 flex space-x-1">{playerIcons}</div>
          </div>
        );
      })}
    </div>
  );
}
