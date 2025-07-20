const TEXT_COLOR_TYPES = {
  normal: {
    bg: "bg-[#AAAA99]",
    text: "text-[#AAAA99]",
  },
  fighting: {
    bg: "bg-[#b54]",
    text: "text-[#b54]",
  },
  flying: {
    bg: "bg-[#89f]",
    text: "text-[#89f]",
  },
  poison: {
    bg: "bg-[#a59]",
    text: "text-[#a59]",
  },
  ground: {
    bg: "bg-[#db5]",
    text: "text-[#db5]",
  },
  rock: {
    bg: "bg-[#ba6]",
    text: "text-[#ba6]",
  },
  bug: {
    bg: "bg-[#ab2]",
    text: "text-[#ab2]",
  },
  ghost: {
    bg: "bg-[#66b]",
    text: "text-[#66b]",
  },
  steel: {
    bg: "bg-[#aab]",
    text: "text-[#aab]",
  },
  fire: {
    bg: "bg-[#FF4422]",
    text: "text-[#FF4422]",
  },
  water: {
    bg: "bg-[#3399ff]",
    text: "text-[#3399ff]",
  },
  grass: {
    bg: "bg-[#77cc55]",
    text: "text-[#77cc55]",
  },
  electric: {
    bg: "bg-[#ffcc33]",
    text: "text-[#ffcc33]",
  },
  psychic: {
    bg: "bg-[#f59]",
    text: "text-[#f59]",
  },
  ice: {
    bg: "bg-[#6cf]",
    text: "text-[#6cf]",
  },
  dragon: {
    bg: "bg-[#76e]",
    text: "text-[#76e]",
  },
  dark: {
    bg: "bg-[#754]",
    text: "text-[#754]",
  },
  fairy: {
    bg: "bg-[#e9e]",
    text: "text-[#e9e]",
  },
  stellar: {
    bg: "bg-emerald-400",
    text: "text-emerald-400",
  },
  unknown: {
    bg: "bg-gray-500",
    text: "text-gray-500",
  },
  default: {
    bg: "bg-gray-200",
    text: "text-gray-200",
  },
};
export const pokemonTextColor = (type: string) => {
  const lowerType = type.toLowerCase();

  const color =
    TEXT_COLOR_TYPES[lowerType as keyof typeof TEXT_COLOR_TYPES] ||
    TEXT_COLOR_TYPES.default;

  return color.text;
};
