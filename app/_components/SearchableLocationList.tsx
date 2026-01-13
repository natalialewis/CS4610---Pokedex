"use client";
import { useState } from "react";
import Link from "next/link";
import { LocationList } from "@/utils/pokemonapi";
import SearchBar from "./SearchBar";
import NumberOfResults from "./NumberOfResults";

type SearchableLocationListProps = {
  locations: LocationList;
};

export default function SearchableLocationList({ locations }: SearchableLocationListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filters the locations based on the search term (client-side)
  const filteredLocations = locations.results.filter((location) =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name)); // Display in alphabetical order

  return (
    <>
      <>
      {/* Search Bar (needs to be in here because the search term is updated with useState) */}
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search All Locations"
      />

      {/* Number of Results (needs to be in here because the number of results changes with the search term) */}
      <NumberOfResults count={filteredLocations.length} />
      {/* Locations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredLocations.map((location) => (
          <Link
            key={location.name}
            href={`/locations/${location.name}`}
            className="bg-blue-100/20 hover:bg-red-100/20 focus:bg-red-100/20 rounded-lg shadow-md hover:shadow-lg focus:shadow-lg transition-shadow p-4 border-2 border-blue-900 hover:border-[var(--pokemon-red)] focus:border-[var(--pokemon-red)] focus:outline-none group"
          >
            <h3 className="text-md font-medium text-gray-900 capitalize text-center">
              {location.name.split("-").join(" ")}
            </h3>
          </Link>
        ))}
      </div>

      {/* No Results Message */}
      {filteredLocations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No Locations found matching "{searchTerm}"</p>
        </div>
      )}
    </>
    </>
  );
}