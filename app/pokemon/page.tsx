import SearchableGrid from '../_components/SearchableGrid';
import { fetchPokemonList } from '@/utils/pokemonapi';
import TabNavigation from '../_components/TabNavigation';

// Get the pokemon list from the API
const pokemon = await fetchPokemonList();

export default function PokemonPage() {
  return (
    <>
      <TabNavigation />
      <SearchableGrid
        data={pokemon}
        typeName="Pokémon"
        hrefBase="pokemon"
      />
    </>
  );
}
