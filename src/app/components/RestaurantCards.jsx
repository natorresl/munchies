import Image from "next/image";

export default function RestaurantCards({ restaurants, status, priceRanges }) {
  const priceRangeMap = {};
  priceRanges.forEach(({ id, range }) => {
    priceRangeMap[id] = range;
  });

  function getDeliveryRange(minutes) {
    if (minutes <= 10) return "0-10 min";
    if (minutes <= 30) return "10-30 min";
    if (minutes <= 60) return "30-60 min";
    return "1 hour";
  }

  return (
    <section className=" h-full ">
      <h2 className="text-4xl pt-10 pb-8">Restaurant’s</h2>
      <div className=" flex w-full gap-4 flex-wrap overflow-y-auto overflow-y-hidden">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="relative flex flex-col justify-between card-style restaurant-card overflow-hidden"
          >
            <Image
              src={restaurant.image_url}
              alt={restaurant.name}
              width={140}
              height={140}
              className="absolute left-54 bottom-23 rounded-lg object-cover z-10"
            />
            {!status[restaurant.id] && (
              <div className="absolute inset-0 closedStatus z-40 flex items-center justify-center">
                <span className=" closedSpan ">Opens tomorrow at 12 pm</span>
              </div>
            )}
            <div className="relative z-30 flex flex-col h-full justify-between">
              <div className="flex gap-2 ">
                <p className="info-tags flex items-center gap-2 ">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      status[restaurant.id] ? "bg-[var(--green)]" : "bg-black"
                    }`}
                  />
                  {status[restaurant.id] ? "Open" : "Closed"}
                </p>
                <p className="info-tags">
                  {getDeliveryRange(restaurant.delivery_time_minutes)}
                </p>
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
          </div>
        ))}
      </div>
    </section>
  );
}
