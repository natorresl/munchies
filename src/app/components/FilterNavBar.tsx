"use client";

import { Filter } from "../types";
import { useFilterParam } from "../hooks/useFilterParam";
import FilterSection from "./FilterSection";

const DELIVERY_OPTIONS = [
  { label: "0-10 min", value: "0-10-min" },
  { label: "10-30 min", value: "10-30-min" },
  { label: "30-60 min", value: "30-60-min" },
  { label: "1 hour+", value: "1-hour+" },
];

const PRICE_OPTIONS = [
  { label: "$", value: "$" },
  { label: "$$", value: "$$" },
  { label: "$$$", value: "$$$" },
  { label: "$$$$", value: "$$$$" },
];

export default function FilterNavBar({ filters }: { filters: Filter[] }) {
  const [selectedCategories, toggleCategory] = useFilterParam("category");
  const [selectedDelivery, toggleDelivery] = useFilterParam("delivery");
  const [selectedPrice, togglePrice] = useFilterParam("price");

  const categoryItems = filters.slice(0, 4).map((f) => ({
    label: f.name,
    value: f.name.toLowerCase(),
  }));

  return (
    <nav className=" pt-0 py-4 flex flex-col sm:min-w-36 sm:w-60 sm:px-6 sm:w-1/6 card-style-nav sm:h-full">
      <h2 className="hidden sm:block sm:pt-6 text-2xl">Filter</h2>

      <FilterSection
        title="food category"
        items={categoryItems}
        selected={selectedCategories}
        onToggle={toggleCategory}
        titleClassName="sm:block hidden subtitle mt-8 mb-4 uppercase"
        className="sm:flex hidden flex-col gap-2"
      />

      <FilterSection
        title="delivery time"
        items={DELIVERY_OPTIONS}
        selected={selectedDelivery}
        onToggle={toggleDelivery}
        className="flex sm:flex-wrap gap-2"
        buttonClassName="gap-2"
      />

      <FilterSection
        title="price range"
        items={PRICE_OPTIONS}
        selected={selectedPrice}
        onToggle={togglePrice}
        titleClassName="sm:block hidden subtitle mt-8 mb-4 uppercase"
        className="hidden sm:flex flex-wrap gap-2"
        buttonClassName="p-2"
      />
    </nav>
  );
}
