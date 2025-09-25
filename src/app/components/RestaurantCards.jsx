import Image from "next/image";

export default function RestaurantCards({ restaurants, status, priceRanges }) {
  const priceRangeMap = {};
  priceRanges.forEach(({ id, range }) => {
    priceRangeMap[id] = range;
  });

  return (
    <section className=" h-full ">
      <h2 className="text-4xl pt-10 pb-8">Restaurant`s</h2>
      <div className=" flex w-full gap-4 flex-wrap overflow-y-auto overflow-y-hidden">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="flex flex-col justify-between card-style restaurant-card overflow-hidden relative"
          >
            <Image
              src={restaurant.image_url}
              alt={restaurant.name}
              width={140}
              height={140}
              className="absolute left-54 bottom-23 rounded-lg object-cover z-10"
            />
            <div className="flex gap-2 ">
            <p className="info-tags flex items-center gap-2">
    <span
      className={`inline-block w-2 h-2 rounded-full ${
        status[restaurant.id] ? "bg-[#00703A]" : "bg-black"
      }`}
    />
    {status[restaurant.id] ? "Open" : "Closed"}
  </p>
              <p className="info-tags">{restaurant.delivery_time_minutes}</p>
            </div>

            <div className="flex justify-between">
              <h3 className="text-2xl">{restaurant.name}</h3>
              <button>
                <Image
                  src="/img/button-arrow-green.png"
                  alt="Arrow Icon"
                  width={32}
                  height={32}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
