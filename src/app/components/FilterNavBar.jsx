"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function FilterNavBar() {
  const [filters, setFilters] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategories =
    searchParams
      .get("category")
      ?.split(",")
      .map((c) => c.toLowerCase()) || [];

  const handleCategoryClick = (category) => {
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

  const selectedDelivery = searchParams.get("delivery")?.split(",") || [];

  const handleDeliveryClick = (range) => {
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
  const selectedPrice = searchParams.get("price")?.split(",") || [];

  const handlePriceClick = (price) => {
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

  useEffect(() => {
    async function fetchData() {
      const dataFilters = await fetch(
        "https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api/filter"
      );

      const filterJson = await dataFilters.json();
      setFilters(filterJson.filters);
    }
    fetchData();
  }, []);

  return (
    <nav className="w-1/6 card-style px-6 py-4 flex flex-col min-w-36 w-60">
      <h2 className=" text-2xl">Filter</h2>

      <h3 className="subtitle mt-8 mb-4">FOOD CATEGORY</h3>
      <ul className="flex flex-col gap-2 ">
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
      <h3 className="subtitle mt-8 mb-4">DELIVERY TIME</h3>
      <ul className="flex flex-wrap gap-2">
        {["0-10 min", "10-30 min", "30-60 min", "1 hour+"].map((range) => (
          <button
            key={range}
            onClick={() => handleDeliveryClick(range)}
            className={`button-style transition-colors ${
              selectedDelivery.includes(range)
                ? "bg-[var(--green)] text-white"
                : ""
            }`}
          >
            {range}
          </button>
        ))}
      </ul>
      <h3 className="subtitle mt-8 mb-4">PRICE RANGE</h3>
      <ul className="flex flex-wrap gap-2 ">
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
