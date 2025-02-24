"use client";

import React from "react";

export default function Dice({ rolling, value }) {
  return (
    <div className="flex justify-center items-center mt-6">
      <div
        className={`w-20 h-20 flex justify-center items-center border-4 rounded-lg
                    bg-white text-4xl font-bold
                    ${rolling ? "animate-spin" : ""}`}
      >
        {rolling ? "?" : value}
      </div>
    </div>
  );
}
