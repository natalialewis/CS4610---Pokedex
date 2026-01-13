import TabNavigation from '../_components/TabNavigation';
import SearchableLocationList from '../_components/SearchableLocationList';
import { fetchLocationList } from '@/utils/pokemonapi';

// Get the location list from the API
const locations = await fetchLocationList();

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TabNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Locations</h1>
        <SearchableLocationList locations={locations} />
      </div>
    </div>
  );
}
