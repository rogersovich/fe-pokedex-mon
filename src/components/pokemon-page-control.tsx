"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  count: number;
  limit: number;
  nextUrl?: string;
  previousUrl?: string;
}

export default function PokemonPageControl({
  count,
  limit,
  nextUrl,
  previousUrl,
}: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current offset from URL (default to 0 if not present or invalid)
  const currentOffset = parseInt(searchParams.get("offset") || "0", 10);

  const handleNext = () => {
    if (nextUrl) {
      const url = new URL(nextUrl);
      const nextOffset = url.searchParams.get("offset");
      router.push(
        `?limit=${limit}&offset=${nextOffset || currentOffset + limit}`
      );
    } else {
      router.push(`?limit=${limit}&offset=${currentOffset + limit}`);
    }
  };

  const handlePrev = () => {
    if (previousUrl) {
      const url = new URL(previousUrl);
      const prevOffset = url.searchParams.get("offset");
      router.push(
        `?limit=${limit}&offset=${
          prevOffset || Math.max(0, currentOffset - limit)
        }`
      );
    } else {
      router.push(
        `?limit=${limit}&offset=${Math.max(0, currentOffset - limit)}`
      );
    }
  };

  // Determine if there are more pages based on total count
  const hasNextPage = currentOffset + limit < count;
  const hasPreviousPage = currentOffset > 0;

  return (
    <div className="flex items-center justify-end w-full gap-2">
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
      <span className="text-sm">
        Page {Math.floor(currentOffset / limit) + 1}
      </span>
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
