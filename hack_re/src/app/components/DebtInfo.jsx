"use client";

import React from "react";

export default function DebtInfo({ debts, players }) {
  return (
    <div className="flex justify-center space-x-8 mt-4">
      {Object.entries(debts).map(([playerId, debt]) => {
        const player = players[playerId];
        return (
          <div
            key={playerId}
            className="p-4 border rounded-lg bg-white shadow-md w-40 text-center"
          >
            {/* プレイヤー名の色を player.color と同じに */}
            <h2
              className="text-lg font-bold"
              style={{ color: player?.color }}
            >
              {player.name}
            </h2>
            {/* 借金額は黒文字に固定 */}
            <p className="text-xl font-semibold text-black">
              -{debt.toLocaleString()}円
            </p>
          </div>
        );
      })}
    </div>
  );
}
