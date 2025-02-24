"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const BOARD_SIZE = 6;
const MAX_POSITION = BOARD_SIZE * BOARD_SIZE - 1; // 35
const INITIAL_DEBT = 500000;

export default function useGame() {
  const router = useRouter();

  // ポップアップ表示やサイコロアニメーション
  const [showPopup, setShowPopup] = useState(false);
  const [rolling, setRolling] = useState(false);
  const [diceValue, setDiceValue] = useState(null);

  // ゲームの主要状態
  const [gameState, setGameState] = useState({
    players: {},
    positions: {},
    debts: {},
    currentPlayer: 1,
    turnCount: 1,
    maxTurns: 10,           // 1年=10ターンなど(設定画面で算出)
    event: "",
    eventType: null,
    isRolling: false,
    isSpecialEvent: false,
    currentAmount: 0,       // ±金額
  });

  // 設定画面からsessionStorageを読み込む (例)
  useEffect(() => {
    const saved = sessionStorage.getItem("gameSettings");
    if (saved) {
      const { players, turnCount } = JSON.parse(saved);

      const initialPositions = {};
      const initialDebts = {};
      Object.keys(players).forEach((id) => {
        initialPositions[id] = 0;
        initialDebts[id] = INITIAL_DEBT;
      });

      setGameState((prev) => ({
        ...prev,
        players,
        positions: initialPositions,
        debts: initialDebts,
        turnCount: 1,
        maxTurns: turnCount, // 例: "年数×10"
        currentPlayer: parseInt(Object.keys(players)[0]) || 1,
      }));
    }
  }, []);

  function rollDice() {
    if (gameState.isRolling) return;
    setRolling(true);

    setGameState((prev) => ({ ...prev, isRolling: true }));

    setTimeout(() => {
      const roll = Math.floor(Math.random() * 6) + 1;
      setDiceValue(roll);
      setRolling(false);

      setTimeout(() => {
        movePlayer(roll);
      }, 500);
    }, 1500);
  }

  function movePlayer(spaces) {
    // setGameState のコールバック内で最新の state (prev) を受け取り、
    // updatedState を作成 → generateEvent を呼び出す、という流れ。
    setGameState((prev) => {
      // 1. 現在位置を取得
      const currentPos = prev.positions[prev.currentPlayer];
  
      // 2. 最後のマス(35)を超えたら最初に戻るループ
      //    6×6=36マス → 余りを取る
      const nextPos = (currentPos + spaces) % 36;
  
      // 3. 新しい state を組み立てる
      //    (今回更新するのは positions だけだが、ほかのフィールドも引き継ぐ)
      const updatedState = {
        ...prev,
        positions: {
          ...prev.positions,
          [prev.currentPlayer]: nextPos,
        },
      };
  
      // 4. ここでイベントを発生させる（最新の updatedState を渡す）
      generateEvent(nextPos, updatedState);
  
      // 5. これを return すると、新たな gameState が React によって反映される
      return updatedState;
    });
  }
  
  

  // イベント生成 (APIへ type: "income"/"expense" を送る)
  async function generateEvent(pos, updatedState) {
    setShowPopup(true);

    // 収支の判定
    const eventType = Math.random() < 0.5 ? "income" : "expense";
    const isSpecial = Math.random() < 0.2;

    // 金額 (正の値)
    const baseAmount = isSpecial
      ? Math.floor(Math.random() * 100000) + 50000
      : Math.floor(Math.random() * 50000) + 10000;

    // 表示上の ±サイン
    let signedAmount = baseAmount;
    if (eventType === "expense") {
      signedAmount = -baseAmount;
    }

    // 借金再計算
    const currentPlayer = updatedState.currentPlayer;
    let newDebt = updatedState.debts[currentPlayer];
    if (eventType === "expense") {
      newDebt += baseAmount;   // 借金が増える
    } else {
      newDebt -= baseAmount;   // 借金が減る
      if (newDebt < 0) newDebt = 0;
    }

    // ステート更新
    const newGameState = {
      ...updatedState,
      eventType,
      isSpecialEvent: isSpecial,
      currentAmount: signedAmount, // ±付きで保持
      debts: {
        ...updatedState.debts,
        [currentPlayer]: newDebt,
      },
    };
    setGameState(newGameState);

    // APIにprefecture, location, typeなど送る
    const prefecture = getPrefectureFromPosition(pos);
    const location = getLocationFromPosition(pos);

    try {
      const response = await fetch("/api/generate-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prefecture,
          location,
          type: eventType,       // "income" or "expense"
          amount: baseAmount,    // APIには正の値
          isSpecial,
          position: pos,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTPエラー: ${response.status}`);
      }

      const data = await response.json();
      if (!data.event) {
        throw new Error("❌ イベント文字列がありません");
      }

      // 生成されたテキストをeventに反映
      setGameState((prev) => ({
        ...prev,
        event: data.event,
      }));
    } catch (err) {
      console.error("❌ イベント取得エラー:", err);
      setGameState((prev) => ({
        ...prev,
        event: "イベント生成中にエラーが発生しました",
      }));
    }
  }

  // 一周ごとにターン数を進める
  function nextTurn() {
    setShowPopup(false);

    setGameState((prev) => {
      const pids = Object.keys(prev.players).map(Number);
      const currentIndex = pids.indexOf(prev.currentPlayer);
      const nextIndex = (currentIndex + 1) % pids.length;
      const nextPlayer = pids[nextIndex];

      // 一周完了なら turnCount++
      let newTurnCount = prev.turnCount;
      if (nextIndex === 0) {
        newTurnCount++;
      }

      // ターン数が上限超えたら終了
      if (newTurnCount > prev.maxTurns) {
        localStorage.setItem(
          "gameResults",
          JSON.stringify({ players: prev.players, debts: prev.debts })
        );
        router.push("/game-result");
        return prev;
      }

      return {
        ...prev,
        currentPlayer: nextPlayer,
        turnCount: newTurnCount,
        event: "",
        eventType: null,
        isRolling: false,
        isSpecialEvent: false,
        currentAmount: 0,
      };
    });
  }

  // ヘルパー: position→都道府県
  function getPrefectureFromPosition(position) {
    if (position <= 5) return "大阪";
    if (position <= 11) return "京都";
    if (position <= 17) return "兵庫";
    if (position <= 23) return "滋賀";
    if (position <= 29) return "奈良";
    return "和歌山";
  }

  // ヘルパー: position→場所
  function getLocationFromPosition(position) {
    const locs = {
      大阪: ["大阪城","通天閣","USJ","道頓堀","天王寺","梅田"],
      京都: ["金閣寺","清水寺","伏見稲荷","嵐山","二条城","祇園"],
      兵庫: ["姫路城","神戸港","有馬温泉","六甲山","明石海峡大橋","北野異人館"],
      滋賀: ["琵琶湖","彦根城","長浜","比叡山","近江八幡","信楽"],
      奈良: ["東大寺","奈良公園","法隆寺","春日大社","平城宮跡","吉野山"],
      和歌山: ["高野山","白浜","熊野古道","和歌山城","那智の滝","円月島"],
    };
    const pref = getPrefectureFromPosition(position);
    return locs[pref][position % 6];
  }

  return {
    gameState,
    showPopup,
    setShowPopup,
    rolling,
    diceValue,
    rollDice,
    nextTurn,
  };
}
