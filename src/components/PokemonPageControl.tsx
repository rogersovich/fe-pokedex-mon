"use client";

import React from "react";

interface PaginationControlsProps {
  count: number;
  limit: number;
  offset: number;
  nextUrl?: string;
  previousUrl?: string;
  onTriggerRefetch: (limit: number, offset: number) => void;
}

export default function PokemonPageControl({
  count,
  limit,
  offset,
  nextUrl,
  previousUrl,
  onTriggerRefetch,
}: PaginationControlsProps) {
  const handleNext = () => {
    if (nextUrl) {
      const offsetVal = offset + limit

      onTriggerRefetch(limit, +offsetVal);
    } else {
      const offsetVal = offset + limit;
      onTriggerRefetch(limit, +offsetVal);
    }
  };

  const handlePrev = () => {
    if (previousUrl) {
     
      const offsetVal = Math.max(0, offset - limit);
      onTriggerRefetch(limit, +offsetVal);
    } else {
      const offsetVal = Math.max(0, offset - limit);
      onTriggerRefetch(limit, +offsetVal);
    }
  };

  // Determine if there are more pages based on total count
  const hasNextPage = offset + limit < count;
  const hasPreviousPage = offset > 0;

  return (
    <div className="flex items-center justify-start gap-2">
      <button
        type="button"
        className={`px-4 py-1.5 rounded text-sm uppercase ${
          hasPreviousPage
            ? "bg-blue-500 text-white cursor-pointer"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
        onClick={handlePrev}
        disabled={!hasPreviousPage}
      >
        Prev
      </button>
      <button
        type="button"
        className={`px-4 py-1.5 rounded text-sm uppercase ${
          hasNextPage
            ? "bg-blue-500 text-white cursor-pointer"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
        onClick={handleNext}
        disabled={!hasNextPage}
      >
        Next
      </button>
    </div>
  );
}
