import { Restaurant, Filter, PriceRange } from "../types";

const API_BASE = "https://work-test-web-2024-eze6j4scpq-lz.a.run.app";

export async function fetchRestaurants(): Promise<Restaurant[]> {
  const res = await fetch(`${API_BASE}/api/restaurants`, {
    cache: "no-store",
  });
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
  const res = await fetch(`${API_BASE}/api/price-range/${id}`);
  return res.json();
}

export async function fetchAllFilters(): Promise<Filter[]> {
  const res = await fetch(`${API_BASE}/api/filter`);
  const data = await res.json();
  return data.filters;
}
