"use client"

import Image from "next/image";
import FilterNavBar from "./components/FilterNavBar";
import FilterFoodCategory from "./components/FilterFoodCategory";
import RestaurantCards from "./components/RestaurantCards";
import { useEffect, useState } from "react";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
async function fetchData() {  

  const dataRestaurants = await fetch('https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api/restaurants')
    const restaurantJson = await dataRestaurants.json()
    setRestaurants(restaurantJson);

}
fetchData();
  }, []);
  console.log(restaurants);
     


  return (
 <div className="min-h-screen h-screen py-10 pl-10 sm:py-10 sm:pl-10 max-w-[1440px]
                    items-center ">
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
        <RestaurantCards />
          </div>
      </div>

    </div>
  );
}
