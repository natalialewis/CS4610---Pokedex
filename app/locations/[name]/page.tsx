import SearchableSection from '@/app/_components/SearchableSection';
import BackButton from '../../_components/BackButton';
import { fetchLocationDetails } from '@/utils/pokemonapi';
import Link from 'next/link';

interface LocationDetailProps {
  params: Promise<{ name: string }>;
}

export default async function LocationDetailPage({ params }: LocationDetailProps) {
  const { name } = await params;
  const data = await fetchLocationDetails(name);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-7 lg:px-10 py-4">
        <BackButton />
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-blue-700/90 p-1 lg:p-2 flex justify-center items-center flex-col">
            <h1 className="lg:text-3xl text-xl font-bold text-white capitalize [text-shadow:0_0_2px_rgba(0,0,0,0.8)]">
              {data.name.replace(/-/g, ' ')}
            </h1>
          </div>

          <div className="px-8 py-5">
            {/* Region */}
            <div className="mb-5">
              <h2 className="text-l lg:text-xl font-bold text-gray-900 mb-2">Region</h2>
              <div className="border-1 border-blue-900/75 rounded-lg p-6 shadow-lg">
                <p className="text-gray-900 font-medium capitalize">
                  {data.region.name.replace(/-/g, ' ')}
                </p>
              </div>
            </div>

            {/* Location Areas */}
            <div className="mb-5">
              <h2 className="text-l lg:text-xl font-bold text-gray-900 mb-2">Location Areas</h2>
              <div className="space-y-4 border-1 border-blue-900/75 rounded-lg p-6 shadow-lg">
                {data.areas.map((area, index) => (
                  <div key={area.name}>
                    <div className="mb-6 rounded-lg p-4 shadow-[0_0_12px_rgba(0,0,0,0.3)]">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 capitalize">
                        {area.name.replace(/-/g, ' ')}
                      </h3>
                      {area.pokemon.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                          {area.pokemon.map((pokemon) => (
                            <Link
                              key={pokemon.name}
                              href={`/pokemon/${pokemon.name}`}
                              className="bg-red-50/80 hover:bg-red-100 border-1 border-red-400 hover:border-red-400 rounded-lg p-2 lg:p-4 transition-colors text-center"
                            >
                              <p className="text-gray-900 font-medium capitalize text-sm">
                                {pokemon.name.replace(/-/g, ' ')}
                              </p>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">No Pokemon found in this area.</p>
                      )}
                    </div>

                    {/* Divider between areas */}
                    {index < data.areas.length - 1 && (
                      <div className="w-[90%] mx-auto h-px bg-blue-900/75 shadow-sm mb-6"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
