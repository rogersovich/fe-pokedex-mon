"use client";

import React from "react";
import Image from "next/image";

export default function ErrorCardPokemon() {
  return (
    <>
      <div className="col-span-12">
        <div className="base-card flex flex-col items-center justify-center gap-2">
          <Image src="/images/error-icon.png" alt="error" width={50} height={50} quality={100} />
          <div className="text-center text-red-500 text-4xl font-bold mb-2">Opps!</div>
          <div className="text-center text-xl">Something went wrong</div>
        </div>
      </div>
    </>
  );
}
