import Image from "next/image";
import FilterNavBar from "./components/FilterNavBar";
import FilterByFood from "./components/FilterByFood";
import RestaurantCards from "./components/RestaurantCards";

export default function Home() {
  return (
 <div className="min-h-screen p-10 sm:p-10
                    items-center ">
                      <Image
          src="/images/munchies-logo.png"
          alt="Munchies Logo"
          width={250}
          height={40}
          className="mb-12"
          
        />
      <div className="flex h-full w-full gap-5 ">
        <FilterNavBar />
        <div className="w-5/6 flex flex-col">
        <FilterByFood />
        <RestaurantCards />
          </div>
      </div>

    </div>
  );
}
