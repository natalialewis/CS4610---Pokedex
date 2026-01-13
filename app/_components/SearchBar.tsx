"use client";
import { ChangeEvent } from "react";

type SearchBarProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
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
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 text-base border-2 border-gray-500 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
      />
    </div>
  );
}
