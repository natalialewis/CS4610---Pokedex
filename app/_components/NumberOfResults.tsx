"use client";

export default function NumberOfResults({ count }: { count: number }) {
  return (
    <div className="mb-4 text-gray-600 w-full text-right text-sm">
      Showing {count} of {count}
    </div>
  );
}