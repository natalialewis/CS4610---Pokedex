"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { name: 'Pokémon', href: '/pokemon' },
  { name: 'Locations', href: '/locations' },
  { name: 'Moves', href: '/moves' },
  { name: 'Generations', href: '/generations' },
];

export default function TabNavigation() {
  const pathname = usePathname();

  // Finds the active tab by checking which tab's href matches the start of the pathname
  const activeTab = tabs.find(tab =>
    pathname.startsWith(tab.href)
  )?.href;

  return (
    <div className="bg-white border-b-2 border-gray-300/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-2 lg:px-8">
        <div className="flex space-x-1 justify-center lg:justify-start overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.href;
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`
                  lg:px-6 lg:py-4 px-3 py-2 text-xs lg:text-base font-semibold whitespace-nowrap border-b-2 transition-colors focus:outline-none focus:border-red-300 focus:bg-gray-50
                  ${isActive
                    ? 'border-red-500 text-red-600 bg-red-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }
                `}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
