"use client";

import clsx from "clsx";
import React from "react";

interface ChipProps {
  type: "grass" | "fire" | "water" | "electric" | string;
  children: React.ReactNode;
}

export default function ChipType({ type, children }: ChipProps) {
  const typeClasses = {
    grass: {
      bg: "bg-green-200",
      text: "text-green-800",
    },
    fire: {
      bg: "bg-red-200",
      text: "text-red-800",
    },
    water: {
      bg: "bg-blue-200",
      text: "text-blue-800",
    },
    electric: {
      bg: "bg-yellow-200",
      text: "text-yellow-800",
    },
    default: {
      bg: "bg-gray-200",
      text: "text-gray-800",
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
          selectedClasses.text // Apply dynamic text color
        )}
      >
        {children}
      </span>
    </div>
  );
}
