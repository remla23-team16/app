import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Restaurant } from '../../data/restaurants';

export const load: PageLoad<{ restaurants: Restaurant[] }> = async ({ fetch }) => {
  const response = await fetch('/api/restaurants', { method: 'GET' });
  const json = await response.json();

  if (!response.ok) {
    throw error(response.status, 'Failed to load restaurants');
  }

  return {
    restaurants: json.restaurants as Restaurant[]
  };
};
