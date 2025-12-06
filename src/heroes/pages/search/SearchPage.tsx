import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { SearchControls } from './ui/SearchControls';
import { CustomBreadcrumb } from '@/components/custom/CustomBreadcrumb';
import { HeroGrid } from '@/heroes/components/HeroGrid';
import { searchHeroesAction } from '@/heroes/actions/search-heroes.action';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get('name') ?? undefined; // o '', o null
  const strength = searchParams.get('strength') ?? undefined; // o '', o null

  const { data: filteredHeroes = [] } = useQuery({
    queryKey: ['search', { name, strength }], // name: name
    queryFn: () => searchHeroesAction({ name, strength }),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      <CustomJumbotron
        title="Superhero Search"
        description="Discover, explore, and manage your favorite superheroes and villains"
      />

      {/* Breadcrumb */}
      <CustomBreadcrumb
        currentPage="Search"
        // breadcrumbs={
        //   [
        //     { label: 'Home', to: '/' },
        //       { label: 'Home 1', to: '/' },
        //       { label: 'Home 2', to: '/' },
        //   ]
        // }
      />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Filter and Search */}
      <SearchControls />

      {/* Filtered Heroes */}
      <HeroGrid heroes={filteredHeroes} />
    </>
  );
};

export default SearchPage;
