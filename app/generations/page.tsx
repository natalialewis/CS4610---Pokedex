import SearchableGrid from '../_components/SearchableGrid';
import { fetchGenerationList } from '@/utils/pokemonapi';
import TabNavigation from '../_components/TabNavigation';

// Get the generation list from the API
const generations = await fetchGenerationList();

export default function GenerationsPage() {
  return (
    <>
      <TabNavigation />
      <SearchableGrid
        data={generations}
        typeName="Generations"
      />
    </>
  );
}
