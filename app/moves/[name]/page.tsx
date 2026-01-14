import SearchableSection from '@/app/_components/SearchableSection';
import BackButton from '../../_components/BackButton';
import { fetchMoveDetails } from '@/utils/pokemonapi';

interface MoveDetailsProps {
  params: Promise<{ name: string }>;
}

export default async function MoveDetailPage({ params }: MoveDetailsProps) {
  const { name } = await params;
  const data = await fetchMoveDetails(name);

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

            {/* Stats */}
            <div className="px-8 py-5">
                <div className="mb-5">
                    <h2 className="text-l lg:text-xl font-bold text-gray-900 mb-2">Stats</h2>
                    <div className="grid grid-cols-3 gap-4">
                    <div className="border-1 border-blue-900/75 rounded-lg p-5 text-center flex flex-col items-center shadow-lg">
                        <p className="text-sm font-medium text-gray-600 mb-1">Accuracy</p>
                        <p className="text-gray-900 font-semibold">{data.accuracy ? data.accuracy : '—'}</p>
                    </div>
                    <div className="border-1 border-blue-900/75 rounded-lg p-5 text-center flex flex-col items-center shadow-lg">
                        <p className="text-sm font-medium text-gray-600 mb-1">PP</p>
                        <p className="text-gray-900 font-semibold text-[var(--pokemon-red)]">{data.pp}</p>
                    </div>
                    <div className="border-1 border-blue-900/75 rounded-lg p-5 text-center flex flex-col items-center shadow-lg">
                        <p className="text-sm font-medium text-gray-600 mb-1">Power</p>
                        <p className="text-gray-900 font-semibold text-[var(--pokemon-red)]">{data.power}</p>
                    </div>
                </div>
            </div>


            {/* Flavor Text - Filter to English only */}
            <div>
              <div className="mb-5">
                <h2 className="text-l lg:text-xl font-bold text-gray-900 mb-2">Flavor Text</h2>
                <div className="space-y-4 border-1 border-blue-900/75 rounded-lg p-6 shadow-lg">
                  {data.flavor_text_entries && data.flavor_text_entries.length > 0 ? (
                    (() => {
                      const englishEntries = data.flavor_text_entries.filter((entry) => entry.language.name === 'en');
                      return englishEntries.length > 0 ? (
                        englishEntries.map((entry, index) => (
                          <div key={`${entry.version_group.name}-${index}`}>
                              <div className="mb-6 rounded-lg p-4 shadow-[0_0_12px_rgba(0,0,0,0.3)]">
                                  <p className="text-sm font-medium text-[var(--pokemon-red)] capitalize mb-1">{entry.version_group.name.replace(/-/g, ' ')}</p>
                                  <p className="text-gray-900 font-medium">{entry.flavor_text}</p>
                              </div>

                              {/* Divider between entries */}
                              {index < englishEntries.length - 1 && (
                                  <div className="w-[90%] mx-auto h-px bg-blue-900/75 shadow-sm mb-6"></div>
                              )}
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm">No English flavor text entries available.</p>
                      );
                    })()
                  ) : (
                    <p className="text-gray-500 text-sm">This move has no flavor text entries.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Learned By Pokémon */}
            <div>
              <SearchableSection
                items={data.learned_by_pokemon.map((pokemon) => ({ name: pokemon.name }))}
                hrefBase="pokemon"
                title="Learned By Pokémon"
                tileColor="yellow"
                emptyMessage="No pokémon learn this move."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
