import type { RequestHandler } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import { restaurants } from '../../../../data/restaurants';

export const POST: RequestHandler = async (event) => {
  const body = await event.request.json();
  assertValidBody(body);

  const restaurant = restaurants.find((r) => r.id === body.id);

  if (!restaurant) {
    throw error(404, 'Restaurant not found');
  }

  restaurant.reviews.push({
    name: body.name,
    rating: body.rating,
    comment: body.comment,
    sentiment: body.sentiment
  });

  return json({ success: true });
};

function assertValidBody(body: unknown): asserts body is {
  id: number;
  name: string;
  rating: number;
  comment: string;
  sentiment: number;
} {
  if (typeof body !== 'object' || body === null) {
    throw error(400, 'Invalid body');
  }

  if (!('id' in body) || typeof body.id !== 'number') {
    throw error(400, 'Invalid restaurant id');
  }

  if (!('name' in body) || typeof body.name !== 'string') {
    throw error(400, 'Invalid reviewer name');
  }

  if (!('rating' in body) || typeof body.rating !== 'number') {
    throw error(400, 'Invalid rating');
  }

  if (!('comment' in body) || typeof body.comment !== 'string') {
    throw error(400, 'Invalid review text');
  }

  if (!('sentiment' in body) || typeof body.sentiment !== 'number') {
    throw error(400, 'Invalid sentiment');
  }
}
