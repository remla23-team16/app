import type { Restaurant } from '../../data/restaurants';
import { restaurants } from '../../data/restaurants';
import { getFrequency, mean } from '$lib/util';

export type Metrics = {
  averageStars: number; // number between 0 and 5 for the avg stars of all reviews
  averageSentiment: number; // number between 0 and 1 for the avg sentiment of all reviews
  starFrequency: Record<number, number>; // number of reviews with each star rating
  sentimentFrequency: Record<number, number>; // number of reviews with each sentiment
};

export function getMetrics(data: Restaurant[]): Metrics {
  const allReviews = restaurants.flatMap((r) => r.reviews);
  const averageSentiment = mean(allReviews, (r) => r.sentiment);
  const averageStars = mean(allReviews, (r) => r.rating);
  const starFrequency = getFrequency(allReviews.map((r) => r.rating));
  const sentimentFrequency = getFrequency(allReviews.map((r) => r.sentiment));

  return {
    averageSentiment,
    averageStars,
    starFrequency,
    sentimentFrequency
  };
}

// TODO: use https://www.npmjs.com/package/prom-client
// TODO: add other metric types (histogram etc)
export function metricsToPrometheus(metrics: Metrics): string {
  return `# HELP average_stars Average stars
# TYPE average_stars gauge
average_stars ${metrics.averageStars}


# HELP average_sentiment Average sentiment
# TYPE average_sentiment gauge
average_sentiment ${metrics.averageSentiment}


# HELP star_frequency Number of reviews with each star rating
# TYPE star_frequency gauge
${Object.entries(metrics.starFrequency)
  .map(([starCount, count]) => `star_frequency{stars="${starCount}"} ${count}`)
  .join('\n')}


# HELP sentiment_frequency Number of reviews with each sentiment
# TYPE sentiment_frequency gauge
${Object.entries(metrics.sentimentFrequency)
  .map(([sentimentCount, count]) => `sentiment_frequency{sentiment="${sentimentCount}"} ${count}`)
  .join('\n')}
`;
}
