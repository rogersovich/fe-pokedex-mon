"use client";

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationControlsProps {
  count: number; // Total count of items
  limit: number; // Number of items per page (passed from parent)
  nextUrl?: string; // next URL from BaseResponse
  previousUrl?: string; // previous URL from BaseResponse
}

export default function PokemonPageControl({ count, limit, nextUrl, previousUrl }: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current offset from URL (default to 0 if not present or invalid)
  const currentOffset = parseInt(searchParams.get('offset') || '0', 10);

  const handleNext = () => {
    // Option 1: Use nextUrl directly if your backend provides full URLs (more robust)
    if (nextUrl) {
      const url = new URL(nextUrl);
      const nextOffset = url.searchParams.get('offset');
      router.push(`?offset=${nextOffset || (currentOffset + limit)}`);
    } else {
      // Fallback if nextUrl is not provided or you want to calculate
      router.push(`?offset=${currentOffset + limit}`);
    }
  };

  const handlePrev = () => {
    // Option 1: Use previousUrl directly
    if (previousUrl) {
      const url = new URL(previousUrl);
      const prevOffset = url.searchParams.get('offset');
      router.push(`?offset=${prevOffset || Math.max(0, currentOffset - limit)}`);
    } else {
      // Fallback if previousUrl is not provided or you want to calculate
      router.push(`?offset=${Math.max(0, currentOffset - limit)}`);
    }
  };

  // Determine if there are more pages based on total count
  const hasNextPage = (currentOffset + limit) < count;
  const hasPreviousPage = currentOffset > 0;

  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        type="button"
        className={`px-4 py-1.5 rounded text-sm uppercase ${
          hasPreviousPage ? 'bg-blue-500 text-white cursor-pointer' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
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
          hasNextPage ? 'bg-blue-500 text-white cursor-pointer' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
        }`}
        onClick={handleNext}
        disabled={!hasNextPage}
      >
        Next
      </button>
    </div>
  )
}
