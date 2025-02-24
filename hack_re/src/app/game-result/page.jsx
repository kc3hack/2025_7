"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ResultScreen = () => {
  const router = useRouter();
  const [players, setPlayers] = useState({});
  const [debts, setDebts] = useState({});
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    // ゲーム結果を localStorage から取得
    const savedResults = localStorage.getItem("gameResults");

    if (savedResults) {
      const { players, debts } = JSON.parse(savedResults);

      setPlayers(players);
      setDebts(debts);

      // 借金が最も少ないプレイヤーを勝者に設定
      const sortedPlayers = Object.entries(debts).sort((a, b) => a[1] - b[1]);
      setWinner(sortedPlayers[0][0]);
    } else {
      // データがない場合はメイン画面にリダイレクト
      router.push("/");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-6">ゲーム結果</h1>

      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold text-center mb-4">最終ランキング</h2>
        <ul className="space-y-4">
          {Object.entries(debts)
            .sort((a, b) => a[1] - b[1]) 
            .map(([playerId, debt]) => (
              <li key={playerId} className={`flex justify-between px-4 py-2 border rounded-lg ${
                playerId === winner ? "bg-yellow-200 font-bold" : "bg-white"
              }`}>
                <span>{players[playerId].name}</span>
                <span className="text-red-500">-{debt.toLocaleString()}円</span>
              </li>
            ))}
        </ul>
      </div>

      <div className="mt-6">
        <button
          onClick={() => {
            localStorage.removeItem("gameResults");
            router.push("/");
          }}
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
        >
          再挑戦
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
