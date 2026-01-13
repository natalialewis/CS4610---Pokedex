"use client";
import { useState } from "react";
import Link from "next/link";
import { PokemonList } from "@/utils/pokemonapi";

type SearchablePokemonListProps = {
  pokemon: PokemonList;
};

export default function SearchablePokemonList({ pokemon }: SearchablePokemonListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filters the pokemon based on the search term (client-side)
  const filteredPokemon = pokemon.results.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name)); // Display in alphabetical order

  return (
    <>
      {/* Search Bar (needs to be in here because the search term is updated with useState) */}
      <div className="relative mb-3">
        {/* Search Icon */}
        <svg 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search All Pokemon"
          className="w-full pl-10 pr-4 py-2 text-base border-2 border-gray-500 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
        />
      </div>

      {/* Number of Results (needs to be in here because the number of results changes with the search term) */}
      <div className="mb-2 text-gray-600 w-full text-right text-sm">
        Showing {filteredPokemon.length} of {filteredPokemon.length}
      </div>

      {/* Pokemon Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredPokemon.map((pokemon) => (
          <Link
            key={pokemon.name}
            href={`/pokemon/${pokemon.name}`}
            className="bg-blue-100/20 hover:bg-red-100/20 focus:bg-red-100/20 rounded-lg shadow-md hover:shadow-lg focus:shadow-lg transition-shadow p-4 border-2 border-blue-900 hover:border-[var(--pokemon-red)] focus:border-[var(--pokemon-red)] focus:outline-none group"
          >
            <h3 className="text-md font-medium text-gray-900 capitalize text-center">
              {pokemon.name.split("-").join(" ")}
            </h3>
          </Link>
        ))}
      </div>

      {/* No Results Message */}
      {filteredPokemon.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No Pokemon found matching "{searchTerm}"</p>
        </div>
      )}
    </>
  );
}
