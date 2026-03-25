import Image from "next/image";
import { Restaurant } from "../../types";

export default function RestaurantCard({ restaurant, isOpen }: { restaurant: Restaurant; isOpen: boolean }) {
  function getDeliveryRange(minutes: number) {
    if (minutes <= 10) return "0-10 min";
    if (minutes <= 30) return "10-30 min";
    if (minutes <= 60) return "30-60 min";
    return "1 hour";
  }

  return (
    <div
      className="relative flex flex-col justify-between card-style restaurant-card overflow-hidden z-10"
    >
      <Image
        src={restaurant.image_url}
        alt={`Animated image of the type of restaurant: ${restaurant.name}`}
        width={140}
        height={140}
        className="absolute left-54 bottom-23 rounded-lg object-cover z-10"
      />
      {!isOpen && (
        <span className="absolute inset-0 closed-status z-20 flex items-center justify-center">
          <p className=" closed-span ">Opens tomorrow at 12 pm</p>
        </span>
      )}
      <div className="relative  flex flex-col h-full justify-between">
        <div className="flex gap-2 ">
          <span className="info-tags flex items-center gap-2 z-30">
            <p
              className={`inline-block w-2 h-2 rounded-full ${
                isOpen ? "bg-[var(--green)]" : "bg-black"
              }`}
            />
            {isOpen ? "Open" : "Closed"}
          </span>
          <p
            className={`info-tags ${
              isOpen ? "" : "hidden"
            }`}
          >
            {getDeliveryRange(restaurant.delivery_time_minutes)}
          </p>
        </div>

        <div className="flex justify-between">
          <h3 className="text-2xl">{restaurant.name}</h3>
          <button>
            <Image
              src="/images/button-arrow-green.png"
              alt="Arrow Icon"
              width={32}
              height={32}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
