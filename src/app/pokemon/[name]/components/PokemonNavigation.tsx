"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function PokemonNavigation() {
  const router = useRouter();

  const goPrevOrNext = (type: "prev" | "next", pokemon_id: number) => {
    console.log(pokemon_id, type);
  };

  const goToAllPokemon = () => {
    router.push("/pokemon");
  };

  return (
    <div className="base-card w-full sticky left-0 bottom-4 outline-2 outline-red-100">
      <div className="w-full flex items-center justify-between">
        <div className="btn-navigation" onClick={() => goPrevOrNext("prev", 1)}>
          <IconArrowLeft size={20} />
          <div className="text-blue-400">Bulbasaur</div>
        </div>
        <div
          className="btn-icon btn-icon--small !font-normal !bg-blue-50 hover:outline-none text-blue-400"
          onClick={() => goToAllPokemon()}
        >
          Back to All Pokemon
        </div>
        <div className="btn-navigation" onClick={() => goPrevOrNext("next", 1)}>
          <div className="text-blue-400">Zapdos</div>
          <IconArrowRight size={20} />
        </div>
      </div>
    </div>
  );
}
