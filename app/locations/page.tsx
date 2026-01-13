import SearchableGrid from '../_components/SearchableGrid';
import { fetchLocationList } from '@/utils/pokemonapi';
import TabNavigation from '../_components/TabNavigation';

// Get the location list from the API
const locations = await fetchLocationList();

export default function LocationsPage() {
  return (
    <>
      <TabNavigation />
      <SearchableGrid
        data={locations}
        typeName="Locations"
      />
    </>
  );
}
