import TabNavigation from '../_components/TabNavigation';
import SearchableGenerationList from '../_components/SearchableGenerationList';
import { fetchGenerationList } from '@/utils/pokemonapi';

// Get the generation list from the API
const generations = await fetchGenerationList();

export default function GenerationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TabNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Generations</h1>
        <SearchableGenerationList generations={generations} />
      </div>
    </div>
  );
}
