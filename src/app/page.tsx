import ChipType from "@/components/ChipType";
import Image from "next/image";

const BASE_IMAGE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

export default function Home() {
  return (
    <>
      <div className="base-card">test</div>
      <div className="grid grid-cols-12 gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="col-span-4">
          <div className="base-card !py-8 flex flex-col justify-center items-center gap-2 cursor-pointer hover:outline-2 hover:outline-green-500">
            <Image
              src={BASE_IMAGE + (index + 1) + '.png'}
              alt="venasaur"
              width={90}
              height={90}
              className="transition-transform duration-300 ease-in-out hover:scale-125"
            />
            <div className="font-bold text-xl">Venasaur</div>
            <div className="flex justify-center items-center gap-2">
              <ChipType type="grass">Grass</ChipType>
              <ChipType type="fire">Fire</ChipType>
            </div>
          </div>
        </div>
      ))}
      </div>
    </>
  );
}
