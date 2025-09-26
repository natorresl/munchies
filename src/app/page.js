"use client"

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import FilterNavBar from "./components/FilterNavBar";
import FilterFoodCategory from "./components/FilterFoodCategory";
import RestaurantCards from "./components/RestaurantCards";
import { useEffect, useState } from "react";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [priceRange, setPriceRange] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [categoryFilters, setCategoryFilters] = useState([]); // renamed

  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchData() {
      // restaurants
      const res = await fetch("https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api/restaurants");
      const { restaurants: restaurantsArray } = await res.json();
      setRestaurants(restaurantsArray);

      // STATUS
      const statusResults = await Promise.all(
        restaurantsArray.map(async (r) => {
          const res = await fetch(`https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api/open/${r.id}`);
          const data = await res.json();
          return { id: r.id, ...data };
        })
      );
      const statusMap = {};
      statusResults.forEach(({ id, is_open }) => (statusMap[id] = is_open));
      setStatusMap(statusMap);

      // PRICE ranges
      const uniquePriceIds = [...new Set(restaurantsArray.map(r => r.price_range_id))];
      const priceRangeResults = await Promise.all(
        uniquePriceIds.map(async (id) => {
          const res = await fetch(`https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api/price-range/${id}`);
          return res.json();
        })
      );
      setPriceRange(priceRangeResults);

      // CATEGORIES (filters by id)
      const allFilterIds = restaurantsArray.flatMap(r => r.filter_ids || []);
      const uniqueFilterIds = [...new Set(allFilterIds)];
      const filterResults = await Promise.all(
        uniqueFilterIds.map(async (id) => {
          const res = await fetch(`https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api/filter/${id}`);
          return res.json(); 
        })
      );
      setCategoryFilters(filterResults);
    }
    fetchData();
  }, []);

  const selectedCategories = searchParams.get("category")?.split(",") || [];
  const selectedDeliveries = searchParams.get("delivery")?.split(",") || [];
  const selectedPrices = searchParams.get("price")?.split(",") || [];


  function getDeliveryRange(minutes) {
    if (minutes <= 10) return "0-10 min";
    if (minutes <= 30) return "10-30 min";
    if (minutes <= 60) return "30-60 min";
    return "1 hour+";
  }


  const priceRangeMap = {};
  priceRange.forEach((p) => { priceRangeMap[p.id] = p.range; });

  const filterMap = {};
  categoryFilters.forEach(f => { filterMap[f.id] = f.name.toLowerCase(); });


  const filteredRestaurants = restaurants.filter(r => {
    const categoryOk =
      selectedCategories.length === 0 ||
      r.filter_ids.some(fid => selectedCategories.includes(filterMap[fid]));

    const deliveryOk =
      selectedDeliveries.length === 0 ||
      selectedDeliveries.includes(getDeliveryRange(r.delivery_time_minutes));

    const priceOk =
      selectedPrices.length === 0 ||
      selectedPrices.includes(priceRangeMap[r.price_range_id] || "");

    return categoryOk && deliveryOk && priceOk;
  });

  return (
    <div className="min-h-screen h-screen py-10 pl-10 sm:py-10 sm:pl-10 max-w-[1440px] items-center ">
      <Image
        src="/images/munchies-logo.png"
        alt="Munchies Logo"
        width={250}
        height={40}
        className="mb-12"
      />
      <div className="flex h-full w-full gap-5 ">
        <FilterNavBar filters={categoryFilters}/>
        <div className="w-5/6 flex flex-col">
          <FilterFoodCategory />
          <RestaurantCards 
            restaurants={filteredRestaurants}
            status={statusMap}
            priceRanges={priceRange}
          />
        </div>
      </div>
    </div>
  );
}