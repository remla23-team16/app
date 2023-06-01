import type { RequestHandler } from '../../../.svelte-kit/types/src/routes/api/sentiment/$types';
import type { Metrics } from '$lib/metrics/prometheus';
import { getMetrics, metricsToPrometheus } from '$lib/metrics/prometheus';
import { restaurants } from '../../data/restaurants';

export const GET: RequestHandler = async (event) => {
  const metrics: Metrics = getMetrics(restaurants);
  return new Response(metricsToPrometheus(metrics));
};
