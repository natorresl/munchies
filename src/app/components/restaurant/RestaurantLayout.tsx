
import { Restaurant } from "../../types";
import RestaurantCard from "./RestaurantCard";

export default function RestaurantLayout({ restaurants, status }: { restaurants: Restaurant[]; status: Record<number, boolean> }) {

  return (
    <section className=" h-screen flex flex-col ">
      <h2 className="text-xl pt-6 pb-5  sm:text-4xl sm:pt-10 sm:pb-8 ">
        Restaurant’s
      </h2>
      <div className=" flex w-full gap-4 flex-wrap overflow-y-scroll h-full pb-70">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            isOpen={status[restaurant.id]}
          />
        ))}
      </div>
    </section>
  );
}
