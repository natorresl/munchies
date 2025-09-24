import Image from "next/image";
import FilterNavBar from "./components/FilterNavBar";
import FilterFoodCategory from "./components/FilterFoodCategory";
import RestaurantCards from "./components/RestaurantCards";

export default function Home() {
  return (
 <div className="min-h-screen h-screen py-10 pl-10 sm:py-10 sm:pl-10
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
