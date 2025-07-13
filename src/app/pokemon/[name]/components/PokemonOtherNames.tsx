import type { TPokemonDetailResponse } from '@/types/pokemon';
import React from 'react'

interface MyProps {
  pokemon: TPokemonDetailResponse;
}


export default function PokemonOtherNames({pokemon}: MyProps) {
  return (
    <>
      <div className="text-3xl font-extrabold mb-6">Other languages</div>
      <div className="grid grid-cols-12 gap-2">
        {pokemon.other_names.map((name, i_name) => (
          <div key={i_name} className="col-span-4">
            <div className="flex flex-col items-start gap-1">
              <span className="font-bold">{name.language}</span>
              <span>{name.name}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
