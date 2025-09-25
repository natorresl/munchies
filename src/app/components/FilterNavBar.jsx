"use client"

import { useEffect, useState } from "react";

export default function FilterNavBar() {

    const [restaurants, setRestaurants] = useState([]);
    const [filters, setFilters] = useState([]);
    const [restaurantsStatus, setRestaurantsStatus] = useState([]);
    const [restaurantIds, setRestaurantsIds] = useState([]);
    const [priceRangeIds, setPriceRangeId] = useState([]);
    const [priceRange, setPriceRange] = useState([]);

    useEffect(() => {
        async function fetchData() {

        //restaurants
            const dataRestaurants = await fetch('https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api/restaurants')
            const restaurantsJson = await dataRestaurants.json()
            const restaurantsArray = restaurantsJson.restaurants
            setRestaurants(restaurantsArray);

        //restaurant id for Status
 const restaurantIds = restaurantsArray.map((r) => r.id);
            setRestaurantsIds(restaurantIds);

        //filter
              const dataFilters = await fetch('https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api/filter')

            const filterJson = await dataFilters.json()
            setFilters(filterJson.filters)

        //status with rest id
            const dataRestaurantsStatus = await fetch(`https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api/open/${restaurantIds[0]}`)

            const restaurantsStatus = await dataRestaurantsStatus.json()
            const restaurantsStatusArray = restaurantsStatus.is_open
            setRestaurantsStatus(restaurantsStatusArray)
      
        //restaurant id for price range 
        
             const priceRangeIds = restaurantsArray.map((r) => r.price_range_id);
            setPriceRangeId(priceRangeIds);

        //delivery time with id
            const dataPriceRange = await fetch(`https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api/price-range/${priceRangeIds[0]}`)
            const priceRange = await dataPriceRange.json()
            const priceRangeArray = priceRange.range

            setPriceRange(priceRangeArray)
         

          
          
        }
        fetchData();
    }, []);

      console.log("nv restaurants",restaurants)
    console.log("nv filters",filters)
   
    console.log( "nv status, is open:",restaurantsStatus)
    console.log("nv price range",priceRange)
    console.log("nv ids",restaurantIds)
    return (
        <nav className="w-1/6 card-style px-6 py-4 flex flex-col min-w-36 w-60">
            <h2 className=" text-2xl">Filter</h2>

            <h3 className="text-xs text-gray-400 tex-bold mt-8 mb-4">FOOD CATEGORY</h3>
            <ul className="flex flex-col gap-2 ">
                {filters.slice(0, 4).map((filter) => (
                    <button key={filter.id}
                        className="button-style"
                    >
                        {filter.name}

                    </button>
                ))}
            </ul>
            <h3 className="text-xs text-gray-400 tex-bold mt-8 mb-4">DELIVERY TIME</h3>
            <ul className="flex flex-wrap gap-2">

                <button className="button-style">0-10 min</button>
                <button className="button-style">10-30 min</button>
                <button className="button-style">30-60 min</button>
                <button className="button-style">1 hour+</button>
            </ul>
            <h3 className="text-xs text-gray-400 tex-bold mt-8 mb-4">PRICE RANGE</h3>
            <ul className="flex flex-wrap gap-2 ">

                <button className="button-style p-2">$</button>
                <button className="button-style p-2">$$</button>
                <button className="button-style p-2">$$$</button>
                <button className="button-style p-2">$$$$</button>

            </ul>

        </nav>
    )
}