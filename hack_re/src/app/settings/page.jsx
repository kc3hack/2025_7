"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  // プレイヤー色には CSS の有効な値(例: "#FF0000", "blue", "rgb(255,0,0)" など)を格納
  const [players, setPlayers] = useState({
    1: { name: "Player1", color: "#FF0000" }, // 赤
    2: { name: "Player2", color: "#0000FF" }, // 青
    3: { name: "Player3", color: "#008000" }, // 緑
    4: { name: "Player4", color: "#800080" }, // 紫
  });

  const [turnCount, setTurnCount] = useState(10);

  // 名前変更
  const handleNameChange = (playerId, newName) => {
    setPlayers((prev) => ({
      ...prev,
      [playerId]: { ...prev[playerId], name: newName },
    }));
  };

  // 色変更(CSSカラーコードを保存)
  const handleColorChange = (playerId, newColor) => {
    setPlayers((prev) => ({
      ...prev,
      [playerId]: { ...prev[playerId], color: newColor },
    }));
  };

  // 設定をsessionStorageに保存 → /gameへ移動
  const handleStartGame = () => {
    sessionStorage.setItem(
      "gameSettings",
      JSON.stringify({ players, turnCount })
    );
    router.push("/game");
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">ゲーム設定</h1>

      {/* プレイヤーごとに名前と色を設定 */}
      {Object.entries(players).map(([playerId, player]) => (
        <div key={playerId} className="mb-4 p-4 border rounded">
          <h2 className="font-semibold mb-2">プレイヤー {playerId}</h2>

          {/* 名前 */}
          <label className="block mt-2">
            名前:
            <input
              type="text"
              value={player.name}
              onChange={(e) => handleNameChange(playerId, e.target.value)}
              className="border rounded px-2 py-1 ml-2"
            />
          </label>

          {/* 色 (TailwindクラスではなくCSSコード) */}
          <label className="block mt-2">
            色:
            <select
              value={player.color}
              onChange={(e) => handleColorChange(playerId, e.target.value)}
              className="border rounded px-2 py-1 ml-2"
            >
              {/* 例: 4色を固定で選択。お好みのカラーコードを増やせます */}
              <option value="#FF0000">赤 (#FF0000)</option>
              <option value="#0000FF">青 (#0000FF)</option>
              <option value="#008000">緑 (#008000)</option>
              <option value="#800080">紫 (#800080)</option>
            </select>
          </label>
        </div>
      ))}

      {/* ターン数 */}
      <div className="mb-4 p-4 border rounded">
        <label className="block">
          ターン数:
          <input
            type="number"
            value={turnCount}
            onChange={(e) => setTurnCount(Number(e.target.value))}
            className="border rounded px-2 py-1 ml-2 w-20"
          />
        </label>
      </div>

      {/* ゲーム開始 */}
      <button
        onClick={handleStartGame}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        ゲーム開始
      </button>
    </div>
  );
}
