import TabNavigation from '../_components/TabNavigation';
import SearchablePokemonList from '../_components/SearchablePokemonList';
import { fetchPokemonList } from '@/utils/pokemonapi';

// Get the pokemon list from the API
const pokemon = await fetchPokemonList();

export default function PokemonPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TabNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">All Pokémon</h1>
        <SearchablePokemonList pokemon={pokemon} />
      </div>
    </div>
  );
}
