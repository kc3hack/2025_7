"use client";
import React from "react";
import Link from "next/link";

function MainComponent() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-12 text-[#333333]">
        関西完済双六
      </h1>

      <div className="flex flex-col gap-6">
        <Link
          href="/game-settings"
          className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-bold py-4 px-8 rounded-lg text-xl md:text-2xl transition duration-200 w-64 md:w-80 text-center"
        >
          ゲーム開始
        </Link>

        <Link
          href="/rules"
          className="bg-[#4ECDC4] hover:bg-[#45B7AF] text-white font-bold py-4 px-8 rounded-lg text-xl md:text-2xl transition duration-200 w-64 md:w-80 text-center"
        >
          ルール説明
        </Link>
      </div>
    </div>
  );
}

export default MainComponent;
