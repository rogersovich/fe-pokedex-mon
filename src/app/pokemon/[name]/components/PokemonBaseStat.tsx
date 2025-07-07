import { apalah } from "@/lib/pokemon-size";
import type { TPokemonDetailResponse, TStat } from "@/types/pokemon";
import clsx from "clsx";
import React from "react";

interface MyProps {
  pokemon: TPokemonDetailResponse;
}

function calculatePercentage(
  statName: string,
  baseStat: number,
  minStat: number,
  maxStat: number
): number {
  let combineStat = maxStat - minStat;

  if (combineStat === 0) {
    return 0; // Hindari pembagian dengan nol
  }

  if (statName == "hp") {
    combineStat = minStat + maxStat;

    return Math.ceil((baseStat / minStat) * 100);
  } else {
    return Math.ceil((baseStat / combineStat) * 100);
  }
}

function getPercentageBgColor(percentage: number): string {
  if (percentage > 80) {
    return "bg-cyan-500";
  } else if (percentage >= 75) {
    return "bg-green-500";
  } else if (percentage >= 65) {
    return "bg-lime-400";
  } else if (percentage >= 50) {
    return "bg-yellow-400";
  } else if (percentage >= 20) {
    return "bg-orange-400";
  } else {
    // percentage < 50
    return "bg-red-400";
  }
}

export default function PokemonBaseStat({ pokemon }: MyProps) {
  const formatStatName = (stat_name: string) => {
    let formatName = "";
    switch (stat_name) {
      case "hp":
        formatName = "HP";
        break;

      case "attack":
        formatName = "Attack";
        break;

      case "defense":
        formatName = "Defense";
        break;

      case "special-attack":
        formatName = "Sp. Atk";
        break;

      case "special-defense":
        formatName = "Sp. Def";
        break;

      case "speed":
        formatName = "Speed";
        break;

      default:
        break;
    }

    return formatName;
  };

  // Fungsi untuk menghitung total base stat dari array stats
  const calcBaseStat = (stats: TStat[]) => {
    // Menjumlahkan semua nilai base_stat dari setiap stat
    return stats.reduce((total, stat) => total + stat.base_stat, 0);
  };

  const listTypes = apalah()

  console.log(listTypes)

  return (
    <>
      <div className="text-3xl font-extrabold mb-4">Base Stat</div>
      <div className="flex flex-col items-center justify-start gap-y-3">
        {pokemon.stats.map((stat, i_stat) => {
          const percentage = calculatePercentage(
            stat.stat_name,
            stat.base_stat,
            stat.min_stat,
            stat.max_stat
          );
          const bgColorClass = getPercentageBgColor(percentage);

          return (
            <div key={i_stat} className="flex items-center w-full gap-x-2">
              <div className="text-sm basis-[10%] text-slate-500">
                {formatStatName(stat.stat_name)}
              </div>
              <div className="text-sm basis-[10%] text-center font-medium">
                {stat.base_stat}
              </div>
              <div className={clsx("text-sm w-full basis-[60%]")}>
                <div
                  className={`h-2.5 rounded-full ${bgColorClass}`}
                  style={{
                    width: `${percentage}%`,
                  }}
                ></div>
              </div>
              <div className="text-sm basis-[10%] text-center font-medium">
                {stat.min_stat}
              </div>
              <div className="text-sm basis-[10%] text-center font-medium">
                {stat.max_stat}
              </div>
            </div>
          );
        })}
        <div className="flex items-center w-full gap-x-2">
          <div className="text-sm basis-[10%] text-slate-500">Total</div>
          <div className="text-sm basis-[10%] text-center font-bold">
            {calcBaseStat(pokemon.stats)}
          </div>
          <div className={clsx("text-sm w-full basis-[60%]")}></div>
          <div className="text-sm basis-[10%] text-center text-slate-400 font-medium">
            Min
          </div>
          <div className="text-sm basis-[10%] text-center text-slate-400 font-medium">
            Max
          </div>
        </div>
      </div>
      <div className="text-sm text-slate-700 mt-5">
        The ranges shown on the right are for a level 100 Pokémon. Maximum
        values are based on a beneficial nature, 252 EVs, 31 IVs; minimum values
        are based on a hindering nature, 0 EVs, 0 IVs.
      </div>
    </>
  );
}
