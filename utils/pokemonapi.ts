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

// Type for list all locations
export type LocationList = {
    count: number; // total number of locations
    results: { // array of location entries
        name: string;
        url: string;
    }[];
};

// Function to fetch list of all locations
export async function fetchLocationList() {
    const response = await fetch('https://pokeapi.co/api/v2/location?limit=10000');
    const locations = await response.json() as LocationList;
    return locations;
}

// Type for list all moves
export type MoveList = {
    count: number; // total number of moves
    results: { // array of move entries
        name: string;
        url: string;
    }[];
};

// Function to fetch list of all moves
export async function fetchMoveList() {
    const response = await fetch('https://pokeapi.co/api/v2/move?limit=10000');
    const moves = await response.json() as MoveList;
    return moves;
}

// Type for list all generations
export type GenerationList = {
    count: number; // total number of generations
    results: { // array of generation entries
        name: string;
        url: string;
    }[];
};

// Function to fetch list of all generations
export async function fetchGenerationList() {
    const response = await fetch('https://pokeapi.co/api/v2/generation?limit=10000');
    const generations = await response.json() as GenerationList;
    return generations;
}

// Type for individual Pokemon details (stats, normal and shiny sprites, locations, moves)
export type PokemonDetails = {
    name: string;
    sprites: {
        front_default: string;
        front_shiny: string;
    };
    stats: { 
        base_stat: number; // value of the stat
        stat: {
            name: string; // name of the stat
        };
    }[];
    location_area_encounters: string; // URL to fetch location encounters
    moves: { 
        move: {
            name: string; // name of the move
        };
    }[];
}

// Function to fetch details of a specific Pokemon by name
export async function fetchPokemonDetails(name: string) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json() as PokemonDetails;
    return data;
}

// Type for location details
export type LocationDetails = {
    name: string;
};