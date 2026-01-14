import Link from 'next/link';
import BackButton from '../../_components/BackButton';
import { fetchPokemonDetails } from '@/utils/pokemonapi';
import Image from 'next/image';

type PokemonDetailProps = {
  params: Promise<{ name: string }>;
};

export default async function PokemonDetailPage(props: PokemonDetailProps) {

  const { name } = await props.params;
  const data = await fetchPokemonDetails(name);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-7 lg:px-10 py-4">
        <BackButton />
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-blue-700/90 p-1 lg:p-2 flex justify-center items-center flex-col">
            <h1 className="lg:text-3xl text-xl font-bold text-white capitalize [text-shadow:0_0_2px_rgba(0,0,0,0.8)]">
              {data.name}
            </h1>
          </div>

          {/* Sprites */}
          <div className="px-8 py-5">
            <div className="mb-5">
              <h2 className="text-l lg:text-2xl font-bold text-gray-900 mb-2">Sprites</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="border-1 border-blue-900/75 rounded-lg p-5 text-center flex flex-col items-center shadow-lg">
                  <p className="text-sm font-medium text-gray-600 mb-1">Default</p>
                  <Image src={data.sprites.front_default} alt={`${data.name} default sprite`} width={120} height={120} />
                </div>
                <div className="border-1 border-blue-900/75 rounded-lg p-5 text-center flex flex-col items-center shadow-lg">
                  <p className="text-sm font-medium text-gray-600 mb-1">Shiny</p>
                  <Image src={data.sprites.front_shiny} alt={`${data.name} shiny sprite`} width={120} height={120} />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mb-5">
              <h2 className="text-l font-bold text-gray-900 mb-2">Base Stats</h2>
              <div className="space-y-4 border-1 border-blue-900/75 rounded-lg p-6 shadow-lg">
                {data.stats.map((stat) => (
                  <div key={stat.stat.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {stat.stat.name}
                      </span>
                      <span className="text-sm text-gray-900">{stat.base_stat} / 255</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all"
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Locations */}
            <div className="mb-5">
              <h2 className="text-l font-bold text-gray-900 mb-2">Locations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {data.locations.map((loc) => (
                  <Link
                    key={loc.name}
                    href={`/locations/${loc.name}`}
                    className="bg-red-50/80 hover:bg-red-100 border-1 border-red-400 hover:border-red-400 rounded-lg p-2 lg:p-4 transition-colors text-center"
                  >
                    <p className="text-gray-900 font-medium capitalize">
                      {loc.name.replace(/-/g, ' ')}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Moves */}
            <div>
              <h2 className="text-l font-bold text-gray-900 mb-2">Moves</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {data.moves.map((move) => (
                  <Link
                    key={move.move.name}
                    href={`/moves/${move.move.name}`}
                    className="bg-yellow-50/80 hover:bg-yellow-100 border-1 border-yellow-400 hover:border-yellow-400 rounded-lg p-2 lg:p-4 transition-colors text-center"
                  >
                    <p className="text-gray-900 font-medium capitalize">
                      {move.move.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
