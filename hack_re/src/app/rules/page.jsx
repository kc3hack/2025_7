"use client";
import React, { useState } from "react";

function MainComponent() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-noto-sans-jp p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#333] mb-8 text-center">
          ゲームルール
        </h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-bold text-[#444] mb-3">
              プレイヤー設定
            </h2>
            <ul className="list-disc ml-6 space-y-2 text-[#666]">
              <li>1人から4人まで参加可能</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#444] mb-3">
              ゲームの初期状態
            </h2>
            <ul className="list-disc ml-6 space-y-2 text-[#666]">
              <li>全プレイヤーは50万円の借金を背負ってスタート</li>
              <li>スタートマスから順番にサイコロを振ってマスを進めていく</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#444] mb-3">ゲーム期間</h2>
            <ul className="list-disc ml-6 space-y-2 text-[#666]">
              <li>1年から5年の間で選択可能</li>
              <li>1年は10ターン</li>
              <li>選択した年数分のターン終了でゲーム終了</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#444] mb-3">勝利条件</h2>
            <ul className="list-disc ml-6 space-y-2 text-[#666]">
              <li>ゲーム終了時に最も資産価値が高いプレイヤーの勝利</li>
              <li>資産価値 = 所持金 - 借金</li>
              <li>借金を完済していなくても資産価値がプラスなら勝利可能</li>
            </ul>
          </section>
        </div>

        <div className="mt-10 text-center">
          <a
            href="/"
            className={`inline-block px-8 py-3 bg-[#4a90e2] text-white rounded-lg transition-transform duration-200 ${
              isHovered ? "scale-105" : ""
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <i className="fas fa-arrow-left mr-2"></i>
            ホームに戻る
          </a>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;