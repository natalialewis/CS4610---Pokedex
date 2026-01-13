import SearchableGrid from '../_components/SearchableGrid';
import { fetchMoveList } from '@/utils/pokemonapi';
import TabNavigation from '../_components/TabNavigation';

// Get the move list from the API
const moves = await fetchMoveList();

export default function MovesPage() {
  return (
    <>
      <TabNavigation />
      <SearchableGrid
        data={moves}
        typeName="Moves"
      />
    </>
  );
}
