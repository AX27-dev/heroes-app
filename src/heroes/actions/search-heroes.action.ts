import { BASE_URL, heroApi } from '../api/hero.api';
import type { Hero } from '../types/hero.interface';

interface Options {
  name: string;
  team: string;
  category: string;
  universe: string;
  status: string;
  strength: string;
}

type OptionalOptions = {
  [K in keyof Options]?: Options[K];
};

export const searchHeroesAction = async (options: OptionalOptions) => {
  const { name, team, category, universe, status, strength } = options;

  if (!name && !team && !category && !universe && !status && !strength) {
    return [];
  }

  const { data } = await heroApi.get<Hero[]>('/search', {
    params: {
      name,
      team,
      category,
      universe,
      status,
      strength,
    },
  });

  return data.map((hero) => ({
    ...hero,
    image: `${BASE_URL}/images/${hero.image}`,
  }));
};
