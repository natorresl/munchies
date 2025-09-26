"use client"

import { useSearchParams } from "next/navigation";

import Image from "next/image";
import FilterNavBar from "./components/FilterNavBar";
import FilterFoodCategory from "./components/FilterFoodCategory";
import RestaurantCards from "./components/RestaurantCards";
import { useEffect, useState } from "react";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantsStatus, setRestaurantsStatus] = useState([]);
  const [restaurantIds, setRestaurantsIds] = useState([]);
  const [priceRangeIds, setPriceRangeId] = useState([]);
  const [priceRange, setPriceRange] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchData() {

      //restaurants
      const dataRestaurants = await fetch('https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api/restaurants')
      const restaurantsJson = await dataRestaurants.json()
      const restaurantsArray = restaurantsJson.restaurants
      setRestaurants(restaurantsArray);

      //restaurant ID for Status
      const restaurantIds = restaurantsArray.map((r) => r.id);
      setRestaurantsIds(restaurantIds);

      //STATUS with restaurant id

      const statusPromises = restaurantIds.map(async (id) => {

        const response = await fetch(
          `https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api/open/${id}`
        );
        const data = await response.json();
        return { id, ...data };
      });

      const statusResults = await Promise.all(statusPromises);
      setRestaurantsStatus(statusResults);

      const statusMap = {};
      statusResults.forEach(({ id, is_open }) => {
        statusMap[id] = is_open;
        
      });
      setStatusMap(statusMap);


      //PRICE range restaurant id

      const priceRangeIds = restaurantsArray.map((r) => r.price_range_id);
      setPriceRangeId(priceRangeIds);

      //PRICE fetching

      const priceRangePromises = priceRangeIds.map(async (id) => {
        const response = await fetch(
          `https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api/price-range/${id}`
        );
        const data = await response.json();
        return { id, ...data };
      });
      const priceRanges = await Promise.all(priceRangePromises);

      setPriceRange(priceRanges)

    }
    fetchData();
  }, []);

   function getCategoryFromImage(url) {
  if (!url) return "";
  return url.split("/").pop().replace(".png", ""); 

}
const categories = searchParams.get("category")?.split(",") || [];
const deliveries = searchParams.get("delivery")?.split(",") || [];
const prices = searchParams.get("price")?.split(",") || [];

  function getDeliveryRange(minutes) {
  if (minutes <= 10) return "0-10 min";
  if (minutes <= 30) return "10-30 min";
  if (minutes <= 60) return "30-60 min";
  return "1 hour+";
}

const priceRangeMap = {};
priceRange.forEach((p) => {
  priceRangeMap[p.id] = p.range;
});

const filteredRestaurants = restaurants.filter(r => {
  const categoryOk =
    categories.length === 0 ||
    categories.includes(getCategoryFromImage(r.image_url).toLowerCase());

  const deliveryOk =
    deliveries.length === 0 ||
    deliveries.includes(getDeliveryRange(r.delivery_time_minutes));

    const priceOk =
  prices.length === 0 || prices.includes(priceRangeMap[r.price_range_id] || "");
  return categoryOk && deliveryOk && priceOk;
});

  console.log(restaurants);
  console.log("status all:", statusMap);
  console.log("price range all:", priceRange);

  return (
    <div className="min-h-screen h-screen py-10 pl-10 sm:py-10 sm:pl-10 max-w-[1440px] items-center ">
      <Image
        src="/images/munchies-logo.png"
        alt="Munchies Logo"
        width={250}
        height={40}
        className="mb-12"
        propriety="true"

      />
      <div className="flex h-full w-full gap-5 ">
        <FilterNavBar />
        <div className="w-5/6 flex flex-col">
          <FilterFoodCategory />
          <RestaurantCards 
          restaurants={filteredRestaurants}
          status={statusMap}
          priceRanges={priceRange}/>
        </div>
      </div>

    </div>
  );
}
