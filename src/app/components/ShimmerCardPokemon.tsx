"use client";

import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ShimmerCardPokemon() {
  return (
    <>
      {[...Array(9)].map((_, idx) => (
        <div key={idx} className="col-span-4">
          <div className="base-card w-full flex flex-col items-center justify-center gap-4">
            <Skeleton circle height="100px" width="100px" />
            <div className="w-[60%]">
              <Skeleton height="16px" width="100%" />
            </div>
            <div className="w-full flex items-center justify-center gap-2">
              <Skeleton height="25px" width="70px" />
              <Skeleton height="25px" width="70px" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
