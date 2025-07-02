"use client";

import clsx from "clsx";
import React from "react";

interface ChipProps {
  type: "grass" | "fire" | "water" | "electric" | string;
  children: React.ReactNode;
}

export default function ChipType({ type, children }: ChipProps) {
  const typeClasses = {
    normal: {
      bg: "bg-[#AAAA99]",
      text: "text-white",
    },
    fighting: {
      bg: "bg-[#b54]",
      text: "text-white",
    },
    flying: {
      bg: "bg-[#89f]",
      text: "text-white",
    },
    poison: {
      bg: "bg-[#a59]",
      text: "text-white",
    },
    ground: {
      bg: "bg-[#db5]",
      text: "text-white",
    },
    rock: {
      bg: "bg-[#ba6]",
      text: "text-white",
    },
    bug: {
      bg: "bg-[#ab2]",
      text: "text-white",
    },
    ghost: {
      bg: "bg-[#66b]",
      text: "text-white",
    },
    steel: {
      bg: "bg-[#aab]",
      text: "text-white",
    },
    fire: {
      bg: "bg-[#FF4422]",
      text: "text-white",
    },
    water: {
      bg: "bg-[#3399ff]",
      text: "text-white",
    },
    grass: {
      bg: "bg-[#77cc55]",
      text: "text-white",
    },
    electric: {
      bg: "bg-[#ffcc33]",
      text: "text-white",
    },
    psychic: {
      bg: "bg-[#f59]",
      text: "text-white",
    },
    ice: {
      bg: "bg-[#6cf]",
      text: "text-white",
    },
    dragon: {
      bg: "bg-[#76e]",
      text: "text-white",
    },
    dark: {
      bg: "bg-[#754]",
      text: "text-white",
    },
    fairy: {
      bg: "bg-[#e9e]",
      text: "text-white",
    },
    stellar: {
      bg: "bg-emerald-400",
      text: "text-white",
    },
    unknown: {
      bg: "bg-gray-500",
      text: "text-white",
    },
    default: {
      bg: "bg-gray-200",
      text: "text-white",
    },
  };

  const selectedClasses =
    typeClasses[type as keyof typeof typeClasses] || typeClasses.default;

  return (
    <div
      className={clsx(
        "px-2.5 py-1.5 rounded-md flex justify-center items-center",
        selectedClasses.bg // Apply dynamic background color
      )}
    >
      <span
        className={clsx(
          "uppercase font-bold text-[12px]",
          selectedClasses.text
        )}
      >
        <span className="text-shadow-2xs">{children}</span>
      </span>
    </div>
  );
}
