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

// Type for location area encounter response
type LocationAreaEncounter = {
    location_area: {
        name: string;
        url: string;
    };
};

// Type for location area API response
type LocationArea = {
    location: {
        name: string;
        url: string;
    };
};

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
    locations: { name: string }[]; // array of location names where the Pokemon can be found (not in main API response)
}

// Function to fetch details of a specific Pokemon by name
export async function fetchPokemonDetails(name: string) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json() as PokemonDetails;
    
    // Fetch location encounters url from data (have to follow a chain to get just the location names)
    const encountersUrl = data.location_area_encounters.startsWith('http')
        ? data.location_area_encounters // if given full URL
        : `https://pokeapi.co${data.location_area_encounters}`; // if given relative URL
    
    const encountersResponse = await fetch(encountersUrl);
    const encounters = await encountersResponse.json() as LocationAreaEncounter[];
    
    // Fetch location area details to get main locations
    const locationAreaPromises = encounters.map(async (encounter) => {
        const locationAreaUrl = encounter.location_area.url;
        const locationAreaResponse = await fetch(locationAreaUrl);
        const locationArea = await locationAreaResponse.json() as LocationArea;
        return locationArea.location.name;
    });
    
    const locationNames = await Promise.all(locationAreaPromises);
    
    // Remove duplicates (if a pokemon appears in multiple location areas but the same main location) and create locations array
    const uniqueLocations = Array.from(new Set(locationNames)).map(name => ({ name }));
    
    // Add locations to the data
    data.locations = uniqueLocations;
    
    return data;
}