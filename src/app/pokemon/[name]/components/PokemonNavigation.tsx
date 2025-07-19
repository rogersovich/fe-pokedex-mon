"use client";

import { formatPokemonName } from "@/lib/string-formatter";
import type { TPokemonNavigation } from "@/types/pokemon";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";

interface PokemonNavigationProps {
  next: TPokemonNavigation | null;
  prev: TPokemonNavigation | null;
}

export default function PokemonNavigation({
  next,
  prev,
}: PokemonNavigationProps) {
  const router = useRouter();

  const goPrevOrNext = (pokemon: TPokemonNavigation | null) => {
    console.log(pokemon)
    if (pokemon) {
      router.push(`/pokemon/${pokemon.name}`);
    }
  };

  const goToAllPokemon = () => {
    router.push("/pokemon");
  };

  return (
    <div className="base-card w-full sticky left-0 bottom-4 outline-2 outline-red-100">
      <div className="w-full flex items-center">
        <div className="basis-[30%]">
          {prev && (
            <div
              className={clsx("btn-navigation")}
              onClick={() => goPrevOrNext(prev)}
            >
              <IconArrowLeft size={20} />
              <div className="text-blue-400">
                {formatPokemonName(prev.name)}
              </div>
            </div>
          )}
        </div>
        <div className="basis-[60%] flex justify-center">
          <div
            className="btn-icon btn-icon--small !font-normal !bg-blue-50 hover:outline-none text-blue-400 w-fit"
            onClick={() => goToAllPokemon()}
          >
            Back to All Pokemon
          </div>
        </div>
        <div className="basis-[30%] flex w-full justify-end">
          {next && (
            <div
              className={clsx("btn-navigation")}
              onClick={() => goPrevOrNext(next)}
            >
              <div className="text-blue-400">
                {formatPokemonName(next.name)}
              </div>
              <IconArrowRight size={20} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
