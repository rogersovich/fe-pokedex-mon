"use client";

import type { TBaseType } from "@/types/types";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const CreatableSelect = dynamic(() => import("react-select/creatable"), { ssr: false });

const formatOptionLabel = (option: TBaseType) => {
  return (
    <div className="flex items-center gap-2">
      <span className="capitalize">{option.name}</span>
    </div>
  );
};

export default function SelectTypePokemon({
  pokemonTypeList,
}: {
  pokemonTypeList: TBaseType[];
}) {
  const [selectedType, setSelectedType] = useState<TBaseType | null>(null);

  const handleChange = (selectedOption: TBaseType | null) => {
    if (selectedOption) {
      setSelectedType(selectedOption);
    }
  };

  return (
    <div className="w-[150px]">
      {/* <CreatableSelect
        value={selectedType}
        options={pokemonTypeList}
        formatOptionLabel={formatOptionLabel}
        onChange={handleChange}
      /> */}
      <CreatableSelect
        value={selectedType}
        options={pokemonTypeList}
        formatOptionLabel={(option) => formatOptionLabel(option as TBaseType)}
        onChange={(option) => handleChange(option as TBaseType)}
      />
    </div>
  );
}
