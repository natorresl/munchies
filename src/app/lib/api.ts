import { Restaurant, Filter, PriceRange } from "../types";
import { cacheLife, cacheTag } from 'next/cache'

const API_BASE = "https://work-test-web-2024-eze6j4scpq-lz.a.run.app";

export async function fetchRestaurants(): Promise<Restaurant[]> {
    'use cache'
    cacheLife('hours')
    cacheTag('restaurants')
  const res = await fetch(`${API_BASE}/api/restaurants`);
  const data = await res.json();
  return data.restaurants;
}

export async function fetchOpenStatus(
  id: number
): Promise<{ is_open: boolean }> {
  const res = await fetch(`${API_BASE}/api/open/${id}`);
  return res.json();
}

export async function fetchPriceRange(id: number): Promise<PriceRange> {
     'use cache'
  cacheLife('days')
  cacheTag('price-ranges')
  const res = await fetch(`${API_BASE}/api/price-range/${id}`);
  return res.json();
}

export async function fetchAllFilters(): Promise<Filter[]> {
     'use cache'
  cacheLife('hours')
  cacheTag('filters')
  const res = await fetch(`${API_BASE}/api/filter`);
  const data = await res.json();
  return data.filters;
}
