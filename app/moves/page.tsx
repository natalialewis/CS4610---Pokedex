import TabNavigation from '../_components/TabNavigation';
import SearchableMoveList from '../_components/SearchableMoveList';
import { fetchMoveList } from '@/utils/pokemonapi';

// Get the move list from the API
const moves = await fetchMoveList();

export default function MovesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TabNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Moves</h1>
        <SearchableMoveList moves={moves} />
      </div>
    </div>
  );
}
