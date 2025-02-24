"use client";

import React from "react";
import useGame from "../hooks/useGame";

import Board from "../components/Board";
import Dice from "../components/Dice";
import DebtInfo from "../components/DebtInfo";
import EventPopup from "../components/EventPopup";

export default function GamePage() {
  const {
    gameState,
    showPopup,
    setShowPopup,
    rolling,
    diceValue,
    rollDice,
    nextTurn,
  } = useGame();

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      {/* 現在のターン / 最大ターン */}
      <div className="text-center mt-4">
        <p className="text-lg font-semibold">
          現在 {gameState.turnCount} ターン目 / 全 {gameState.maxTurns} ターン
        </p>
      </div>

      {/* サイコロ */}
      <Dice rolling={rolling} value={diceValue} />

      {/* 盤面 */}
      <div className="flex justify-center mt-6">
        <Board positions={gameState.positions} players={gameState.players} />
      </div>

      {/* サイコロボタン */}
      <div className="flex justify-center mt-6">
        <button
          onClick={rollDice}
          disabled={gameState.isRolling || rolling}
          className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg"
        >
          {rolling ? "サイコロを振っています..." : "サイコロを振る"}
        </button>
      </div>

      {/* 借金情報 */}
      <DebtInfo debts={gameState.debts} players={gameState.players} />

      {/* イベントポップアップ */}
      {showPopup && (
      <EventPopup
        event={gameState.event} 
        amount={gameState.currentAmount}  // ±付きの数値
        onClose={() => {
          setShowPopup(false);
          nextTurn();
        }}
      />
    )}
    </div>
  );
}
