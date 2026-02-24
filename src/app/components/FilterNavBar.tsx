"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Filter } from "../types";

export default function FilterNavBar({ filters }: { filters: Filter[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategories: string[] =
    searchParams
      .get("category")
      ?.split(",")
      .map((c) => c.toLowerCase()) || [];

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let categories = params.get("category")?.split(",") || [];
    if (categories.includes(category)) {
      categories = categories.filter((c) => c !== category);
    } else {
      categories.push(category);
    }
    categories.length > 0
      ? params.set("category", categories.join(","))
      : params.delete("category");
    router.push(`/?${params.toString()}`);
  };

  const selectedDelivery: string[] = searchParams.get("delivery")?.split(",") || [];

  const handleDeliveryClick = (range: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let deliveries = params.get("delivery")?.split(",") || [];

    if (deliveries.includes(range)) {
      deliveries = deliveries.filter((d) => d !== range);
    } else {
      deliveries.push(range);
    }

    if (deliveries.length > 0) {
      params.set("delivery", deliveries.join(","));
    } else {
      params.delete("delivery");
    }

    router.push(`/?${params.toString()}`);
  };
  const selectedPrice: string[] = searchParams.get("price")?.split(",") || [];

  const handlePriceClick = (price: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let prices = params.get("price")?.split(",") || [];

    if (prices.includes(price)) {
      prices = prices.filter((p) => p !== price);
    } else {
      prices.push(price);
    }

    if (prices.length > 0) {
      params.set("price", prices.join(","));
    } else {
      params.delete("price");
    }

    router.push(`/?${params.toString()}`);
  };


  return (
    <nav className=" pt-0 py-4 flex flex-col sm:min-w-36 sm:w-60 sm:px-6 sm:w-1/6 card-style-nav sm:h-full">
      <h2 className="hidden sm:block sm:pt-6 text-2xl">Filter</h2>

      <h3 className="sm:block hidden subtitle mt-8 mb-4 uppercase">
        food category
      </h3>
      <ul className=" sm:flex hidden flex-col gap-2 ">
        {filters.slice(0, 4).map((filter) => (
          <button
            key={filter.id}
            className={`button-style  ${
              selectedCategories.includes(filter.name.toLowerCase())
                ? "bg-[var(--green)] text-white"
                : ""
            }`}
            onClick={() => handleCategoryClick(filter.name.toLowerCase())}
          >
            {filter.name}
          </button>
        ))}
      </ul>
      <h3 className="subtitle sm:mt-8 sm:mb-4 mb-2.5 uppercase">
        delivery time
      </h3>
      <ul className="flex  sm:flex-wrap gap-2">
        {["0-10 min", "10-30 min", "30-60 min", "1 hour+"].map((range) => (
          <button
            key={range}
            onClick={() => handleDeliveryClick(range)}
            className={`button-style transition-colors gap-2 ${
              selectedDelivery.includes(range)
                ? "bg-[var(--green)] text-white"
                : ""
            }`}
          >
            {range}
          </button>
        ))}
      </ul>
      <h3 className="sm:block hidden subtitle mt-8 mb-4 uppercase">
        price range
      </h3>
      <ul className=" hidden sm:flex flex-wrap gap-2 ">
        {["$", "$$", "$$$", "$$$$"].map((price) => (
          <button
            key={price}
            onClick={() => handlePriceClick(price)}
            className={`button-style p-2 transition-colors ${
              selectedPrice.includes(price)
                ? "bg-[var(--green)] text-white"
                : ""
            }`}
          >
            {price}
          </button>
        ))}
      </ul>
    </nav>
  );
}
