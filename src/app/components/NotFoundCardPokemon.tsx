"use client";

import React from "react";
import Image from "next/image";

export default function NotFoundCardPokemon() {
  return (
    <>
      <div className="col-span-12">
        <div className="base-card flex flex-col items-center justify-center gap-2">
          <Image src="/images/warning-icon.png" alt="error" width={50} height={50} quality={100} />
          <div className="text-center text-yellow-500 text-4xl font-bold mb-2">Oops!</div>
          <div className="text-center text-xl">No results found</div>
        </div>
      </div>
    </>
  );
}
