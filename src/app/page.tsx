import Image from "next/image";
import FilterNavBar from "./components/FilterNavBar";
import FilterFoodCategory from "./components/FilterFoodCategory";
import RestaurantLayout from "./components/restaurant/RestaurantLayout";
import { PriceRange, Filter } from "./types";
import {
  fetchRestaurants,
  fetchOpenStatus,
  fetchPriceRange,
  fetchAllFilters,
} from "./lib/api";


function getDeliveryRange(minutes: number): string {
  if (minutes <= 10) return "0-10-min";
  if (minutes <= 30) return "10-30-min";
  if (minutes <= 60) return "30-60-min";
  return "1-hour+";
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;

  // Parallel fetch: restaurants + filters
  const [restaurants, filters] = await Promise.all([
    fetchRestaurants(),
    fetchAllFilters(),
  ]);

  // Parallel fetch: open status per restaurant + price ranges for unique IDs
  const uniquePriceRangeIds = [
    ...new Set(restaurants.map((r) => r.price_range_id)),
  ];

  const [statusResults, priceRanges] = await Promise.all([
    Promise.all(
      restaurants.map(async (r) => {
        const data = await fetchOpenStatus(r.id);
        return { id: r.id, is_open: data.is_open };
      })
    ),
    Promise.all(uniquePriceRangeIds.map((id) => fetchPriceRange(id))),
  ]);

  // Build lookup maps
  const statusMap: Record<number, boolean> = {};
  statusResults.forEach(({ id, is_open }) => {
    statusMap[id] = is_open;
  });

  const filterMap: Record<number, string> = {};
  filters.forEach((f: Filter) => {
    filterMap[f.id] = f.name.toLowerCase();
  });

  const priceRangeMap: Record<number, string> = {};
  priceRanges.forEach((p: PriceRange) => {
    priceRangeMap[p.id] = p.range.toLowerCase();
  });

  // Extract filter criteria from searchParams
  const categoryParam =
    typeof resolvedParams.category === "string" ? resolvedParams.category : "";
  const deliveryParam =
    typeof resolvedParams.delivery === "string" ? resolvedParams.delivery : "";
  const priceParam =
    typeof resolvedParams.price === "string" ? resolvedParams.price : "";

  const selectedCategories = categoryParam ? categoryParam.split(",") : [];
  const selectedDeliveries = deliveryParam ? deliveryParam.split(",") : [];
  const selectedPrices = priceParam ? priceParam.split(",") : [];

  // Filter restaurants server-side
  const filteredRestaurants = restaurants.filter((r) => {
    const categoryOk =
      selectedCategories.length === 0 ||
      r.filter_ids.some((fid) =>
        selectedCategories.includes(filterMap[fid])
      );

    const deliveryOk =
      selectedDeliveries.length === 0 ||
      selectedDeliveries.includes(getDeliveryRange(r.delivery_time_minutes));

    const priceOk =
      selectedPrices.length === 0 ||
      selectedPrices.includes(priceRangeMap[r.price_range_id] || "");

    return categoryOk && deliveryOk && priceOk;
  });

  return (
    <main className="min-h-screen h-screen py-10 pl-6 overflow-y-hidden sm:pl-10 sm:py-10 sm:pl-10 max-w-[1440px] items-center ">
      <div className="sm:flex h-full w-full gap-5 ">
        <FilterNavBar filters={filters} />
        <div className="sm:w-5/6 h-full flex flex-col">
          <FilterFoodCategory filters={filters} />
          <RestaurantLayout
            restaurants={filteredRestaurants}
            status={statusMap}
          />
        </div>
      </div>
    </main>
  );
}