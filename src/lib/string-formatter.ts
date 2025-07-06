export function formatPokemonName(name: string): string {
  if (!name) {
    return "";
  }

  // 1. Replace hyphens with spaces
  const withSpaces = name.replace(/-/g, ' ');

  // 2. Capitalize the first letter of each word
  const capitalized = withSpaces
    .split(' ') // Split the string into an array of words
    .map(word => {
      if (word.length === 0) {
        return ''; // Handle empty strings that might result from multiple hyphens
      }
      return word.charAt(0).toUpperCase() + word.slice(1); // Capitalize first letter
    })
    .join(' '); // Join the words back into a single string

  return capitalized;
}