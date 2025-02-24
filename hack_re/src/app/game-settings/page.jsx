"use client";
import React, { useState } from "react";

function MainComponent() {
  // 初期プレイヤー数と年数を管理
  const [playerCount, setPlayerCount] = useState(2);
  const [turnCount, setTurnCount] = useState(1);

  const handleStartGame = () => {
    const players = {};
    // プレイヤー人数ごとの色割り当て（変わらず）
    const colors = {
      2: ["red", "blue"],
      3: ["red", "blue", "green"],
      4: ["red", "blue", "green", "yellow"],
    };

    // プレイヤー情報を players オブジェクトにセット
    for (let i = 1; i <= playerCount; i++) {
      players[i] = {
        name: `プレイヤー${i}`,
        color: colors[playerCount][i - 1],
      };
    }

    // 1年 = 10ターンに修正
    sessionStorage.setItem(
      "gameSettings",
      JSON.stringify({
        players,
        turnCount: turnCount * 10, // ここを *10 に変更
      })
    );

    // ゲーム画面に移動
    window.location.href = "/game";
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-8">ゲーム設定</h1>

        <div className="space-y-6">
          {/* プレイヤー数の選択 */}
          <div>
            <label className="block font-bold mb-2">プレイヤー数</label>
            <select
              name="playerCount"
              value={playerCount}
              onChange={(e) => setPlayerCount(Number(e.target.value))}
              className="w-full p-2 border rounded-md"
            >
              {[2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  {num}人
                </option>
              ))}
            </select>
          </div>

          {/* 年数の選択（内部的には年数×10ターン） */}
          <div>
            <label className="block font-bold mb-2">ターン数</label>
            <select
              name="turnCount"
              value={turnCount}
              onChange={(e) => setTurnCount(Number(e.target.value))}
              className="w-full p-2 border rounded-md"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}年
                </option>
              ))}
            </select>
          </div>

          {/* ボタン類 */}
          <div className="flex flex-col space-y-4 pt-4">
            <button
              onClick={handleStartGame}
              className="w-full bg-[#FF6B6B] hover:bg-[#FF5252] text-white py-3 rounded-md font-bold"
            >
              ゲーム開始
            </button>

            <a
              href="/"
              className="w-full bg-[#4ECDC4] hover:bg-[#45B7AF] text-white py-3 rounded-md font-bold text-center"
            >
              戻る
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;
