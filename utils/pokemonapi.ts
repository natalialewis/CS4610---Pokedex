// Type for list of all Pokemon
export type PokemonList = {
  count: number; // total number of Pokemon
  results: { // array of Pokemon entries
    name: string;
    url: string;
  }[];
};

// Function to fetch list of all Pokemon
export async function fetchPokemonList() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
    const pokemon = await response.json() as PokemonList;
    return pokemon;
}