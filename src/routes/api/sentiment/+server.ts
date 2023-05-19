import type { RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { error, json } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
  if (!env.BACKEND_URL) {
    console.error('No backend url configured');
    throw error(500);
  }

  const reviewText = event.url.searchParams.get('text');

  if (!reviewText) {
    throw error(400, 'You must provide a text to perform sentiment analysis on');
  }

  const endpointUrl = new URL(`/${decodeURIComponent(reviewText)}`, env.BACKEND_URL);
  const response = await fetch(endpointUrl.toString(), { method: 'GET' });

  if (!response.ok) {
    console.error(`Model service returned status ${response.status}`);
    throw error(500);
  }

  const jsonResponse = await response.json();

  if (
    !Array.isArray(jsonResponse) ||
    jsonResponse.length < 1 ||
    typeof jsonResponse[0] !== 'number'
  ) {
    console.error(`Model service returned unexpected format`);
    throw error(500);
  }

  const [sentiment] = jsonResponse;
  const sentimentText = ['negative', 'positive'][sentiment];

  if (!sentimentText) {
    console.error(`Model service returned unexpected sentiment number '${sentiment}'`);
    throw error(500);
  }

  return json({ sentiment: sentimentText });
};
