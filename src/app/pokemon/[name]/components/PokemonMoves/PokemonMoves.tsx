"use client";

import { formatPokemonName } from "@/lib/string-formatter";
import type { TGroupedMove } from "@/types/pokemon";
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styles from "./PokemonMoves.module.css";

interface MyProps {
  pokeMoves: TGroupedMove[];
  pokemonName: string;
}

const getDescMoveType = (
  type: string,
  method_name: string,
  pokemon_name: string
) => {
  const methodName = formatPokemonName(method_name);
  if (type == "level-up") {
    return `${pokemon_name} learns the following moves in Pokémon ${methodName} at the levels specified.`;
  } else if (type == "egg") {
    return `${pokemon_name} learns the following moves via breeding or picnics in Pokémon ${methodName}.`;
  } else if (type == "machine") {
    return `${pokemon_name} is compatible with these Technical Machines in Pokémon ${methodName}.`;
  }
};

export default function PokemonMoves({ pokeMoves, pokemonName }: MyProps) {
  return (
    <>
      <div className="text-3xl font-extrabold mb-4">Moves learned</div>
      <Tabs>
        <TabList className={styles.tabList}>
          {pokeMoves.map((move, i_move) => (
            <Tab key={i_move} className={styles.tab}>
              {formatPokemonName(move.group_name)}
            </Tab>
          ))}
        </TabList>

        {pokeMoves.map((move, i_move) => (
          <TabPanel key={i_move}>
            <div className="grid grid-cols-2 gap-6">
              {move.moves_by_method.map((method, i_move_by_method) => (
                <div key={i_move_by_method} className="col-span-1">
                  <h2 className="text-xl font-bold mb-2">{`Move learnt by ${formatPokemonName(
                    method.method_name
                  )}`}</h2>
                  <div className="text-sm text-slate-700">
                    {getDescMoveType(
                      method.method_name,
                      move.group_name,
                      formatPokemonName(pokemonName)
                    )}
                  </div>
                  <div className="mt-4">
                    <table className="w-full">
                      <thead className="bg-slate-200 sticky top-0 left-0">
                        <tr>
                          {method.method_name == "level-up" && (
                            <th className="text-left p-3 w-[15%]">Level</th>
                          )}
                          <th className="text-left p-3">Move</th>
                        </tr>
                      </thead>
                      <tbody>
                        {method.moves.map((move, i_move) => (
                          <tr
                            key={i_move}
                            className="border-b border-slate-200"
                          >
                            {method.method_name == "level-up" && (
                              <td className="py-2 px-4 text-right">
                                {move.level_learned_at}
                              </td>
                            )}
                            <td className="py-2 px-4">
                              <a className="text-blue-400 font-bold hover:underline">
                                {formatPokemonName(move.move_name)}
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </>
  );
}
