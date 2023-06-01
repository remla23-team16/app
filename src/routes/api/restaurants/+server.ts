import type { RequestHandler } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import { restaurants } from '../../../data/restaurants';

export const GET: RequestHandler = async (event) => {
  const id = event.url.searchParams.get('id');

  if (!id) {
    return json({ restaurants });
  }

  if (Number.isNaN(Number(id))) {
    throw error(400, 'You must provide a numerical restaurant id');
  }

  const restaurant = restaurants.find((r) => r.id === Number(id));

  if (!restaurant) {
    throw error(404, 'Restaurant not found');
  }

  return json(restaurant);
};
