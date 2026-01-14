import BackButton from '../../_components/BackButton';
import { fetchGenerationDetails } from '@/utils/pokemonapi';
import SearchableSection from '../../_components/SearchableSection';

interface GenerationDetailProps {
  params: Promise<{ name: string }>;
}

export default async function GenerationDetailPage({ params }: GenerationDetailProps) {
  const { name } = await params;
  const data = await fetchGenerationDetails(name);

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
            {/* Main Region */}
            <div className="mb-5">
              <h2 className="text-l lg:text-xl font-bold text-gray-900 mb-2">Main Region</h2>
              <div className="border-1 border-blue-900/75 rounded-lg p-6 shadow-lg">
                {data.main_region ? (
                  <p className="text-gray-900 font-medium capitalize">
                    {data.main_region.name.replace(/-/g, ' ')}
                  </p>
                ) : (
                  <p className="text-gray-500 text-sm">This generation does not have a main region.</p>
                )}
              </div>
            </div>

            {/* Pokemon Species */}
            <SearchableSection
              items={data.pokemon_species.map((species) => ({ name: species.name }))}
              hrefBase="pokemon"
              title="Pokémon Species"
              tileColor="red"
              emptyMessage="No Pokémon species found for this generation."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
