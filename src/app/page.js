import Image from "next/image";
import FilterNavBar from "./components/FilterNavBar";
import FilterByFood from "./components/FilterByFood";

export default function Home() {
  return (
 <div className="min-h-screen p-10 sm:p-10
                    items-center ">
                      <Image
          src="/img/munchies-logo.png"
          alt="Munchies Logo"
          width={250}
          height={40}
          className="mb-12"
          
        />
      <div className="flex h-full w-full gap-5 ">
        <FilterNavBar />
        <div className="w-5/6 flex flex-col">
        <FilterByFood />
        <section className=" h-full" >
           <h2 className="text-4xl pt-10 pb-8">Restaurant`s</h2>
          <div className=" flex w-full h-full gap-4 flex-wrap justify-center">
            <h3 className="card-style restaurant-card">Food Card</h3>
            <h3 className="card-style restaurant-card">Food Card</h3>
            <h3 className="card-style restaurant-card">Food Card</h3>
             <h3 className="card-style restaurant-card">Food Card</h3>
          </div>
          </section>
          </div>
      </div>

    </div>
  );
}
