import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Restaurant } from '../../../data/restaurants';

export const load: PageLoad<{ restaurant: Restaurant }> = async ({ params, fetch }) => {
  const p = new URLSearchParams({
    id: String(params.id)
  });
  const response = await fetch(`/api/restaurants?${p}`, { method: 'GET' });

  if (!response.ok) {
    throw error(response.status, 'Failed to load restaurant');
  }

  const json = await response.json();

  return {
    restaurant: json as Restaurant
  };
};
