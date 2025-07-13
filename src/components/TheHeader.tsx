import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function TheHeader() {
  return (
    <div className="base-card flex justify-center gap-6 sticky top-0 border border-slate-200 z-10">
      <Link href="/">
        <div className="px-4 py-2 bg-red-50 hover:outline-2 hover:outline-red-200 rounded font-bold flex items-center gap-2">
          <Image
            src="/icons/life-orb.png"
            alt="life-orb"
            width={25}
            height={25}
            quality={100}
          />
          <span>Home</span>
        </div>
      </Link>
      <Link href="/pokemon">
        <div className="px-4 py-2 bg-red-50 hover:outline-2 hover:outline-red-200 rounded font-bold flex items-center gap-2">
          <Image
            src="/icons/poke-ball.png"
            alt="pokeball"
            width={25}
            height={25}
            quality={100}
          />
          <span>Pokedex</span>
        </div>
      </Link>
      <Link href="/about">
        <div className="px-4 py-2 hover:outline-2 hover:outline-red-200 bg-red-50 rounded font-bold flex items-center gap-2">
          <Image
            src="/icons/pecha-berry.png"
            alt="pecha_berry"
            width={25}
            height={25}
            quality={100}
          />
          <span>Berries</span>
        </div>
      </Link>
    </div>
  );
}
