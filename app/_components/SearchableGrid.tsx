"use client";
import { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { PokemonList, LocationList, MoveList, GenerationList } from "@/utils/pokemonapi";

type SearchableGridProps = {
  data: PokemonList | LocationList | MoveList | GenerationList; // Can accept any of the list types because they share the same structure
  typeName: string; // e.g., "Pokemon", "Moves", "Generations", "Locations"
};

export default function SearchableGrid({
  data,
  typeName,
}: SearchableGridProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filters the items based on the search term (client-side)
  const filteredItems = data.results
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name)); // Display in alphabetical order

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{`All ${typeName}`}</h1>

        {/* Search Bar */}
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Search All ${typeName}`}
        />

        {/* Number of Results */}
        <div className="mb-4 text-gray-600 w-full text-right text-sm">
          Showing {filteredItems.length} of {filteredItems.length}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredItems.map((item) => {
            const href = `/${typeName.toLowerCase()}/${item.name}`;
            return (
              <Link
                key={item.name}
                href={href}
                className="bg-blue-100/20 hover:bg-red-100/20 focus:bg-red-100/20 rounded-lg shadow-md hover:shadow-lg focus:shadow-lg transition-shadow p-4 border-2 border-blue-900 hover:border-[var(--pokemon-red)] focus:border-[var(--pokemon-red)] focus:outline-none group"
              >
                <h3 className="text-md font-medium text-gray-900 capitalize text-center">
                  {item.name.split("-").join(" ")}
                </h3>
              </Link>
            );
          })}
        </div>

        {/* No Results Message */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No {typeName.toLowerCase()} found matching "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
