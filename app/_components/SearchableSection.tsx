"use client";
import { useState } from "react";
import Link from "next/link";

type SearchableSectionProps = {
  items: Array<{ name: string }>;
  hrefBase: string;
  title: string;
  tileColor: "red" | "yellow";
  emptyMessage?: string;
};

export default function SearchableSection({
  items,
  hrefBase,
  title,
  tileColor,
  emptyMessage,
}: SearchableSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter items based on search term
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Determine background and border colors based on tileColor prop
  const bgColor = tileColor === "red" ? "bg-red-50/80 hover:bg-red-100" : "bg-yellow-50/80 hover:bg-yellow-100";
  const borderColor = tileColor === "red" ? "border-red-400 hover:border-red-400" : "border-yellow-400 hover:border-yellow-400";

  return (
    <div className="mb-5 mt-10">
      <div className="flex items-center justify-between mb-2 gap-4 flex-wrap">
        <h2 className="text-l lg:text-xl font-bold text-gray-900">{title}</h2>
        <div className="flex-1 max-w-2xs min-w-[200px]">
          <div className="relative">
            {/* Search Icon */}
            <svg
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search ${title.toLowerCase()}...`}
              className="w-full pl-8 pr-3 py-2 text-md border-1 border-blue-900/75 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Link
              key={item.name}
              href={`/${hrefBase}/${item.name}`}
              className={`${bgColor} border-1 ${borderColor} rounded-lg p-2 lg:p-4 transition-colors text-center`}
            >
              <p className="text-gray-900 font-medium capitalize">
                {item.name.replace(/-/g, " ")}
              </p>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-4">
            <p className="text-gray-500 text-sm">
              {searchTerm.trim() === "" && emptyMessage
                ? emptyMessage
                : `No ${title.toLowerCase()} found matching "${searchTerm}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
