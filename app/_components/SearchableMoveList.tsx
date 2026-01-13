"use client";
import { useState } from "react";
import Link from "next/link";
import { MoveList } from "@/utils/pokemonapi";
import SearchBar from "./SearchBar";
import NumberOfResults from "./NumberOfResults";

type SearchableMoveListProps = {
  moves: MoveList;
};

export default function SearchableMoveList({ moves }: SearchableMoveListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filters the moves based on the search term (client-side)
  const filteredMoves = moves.results.filter((move) =>
    move.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name)); // Display in alphabetical order

  return (
    <>
      {/* Search Bar (needs to be in here because the search term is updated with useState) */}
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search All Moves"
      />

      {/* Number of Results (needs to be in here because the number of results changes with the search term) */}
      <NumberOfResults count={filteredMoves.length} />
      {/* Moves Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredMoves.map((move) => (
          <Link
            key={move.name}
            href={`/move/${move.name}`}
            className="bg-blue-100/20 hover:bg-red-100/20 focus:bg-red-100/20 rounded-lg shadow-md hover:shadow-lg focus:shadow-lg transition-shadow p-4 border-2 border-blue-900 hover:border-[var(--pokemon-red)] focus:border-[var(--pokemon-red)] focus:outline-none group"
          >
            <h3 className="text-md font-medium text-gray-900 capitalize text-center">
              {move.name.split("-").join(" ")}
            </h3>
          </Link>
        ))}
      </div>

      {/* No Results Message */}
      {filteredMoves.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No Moves found matching "{searchTerm}"</p>
        </div>
      )}
    </>
  );
}
