"use client";

import Image from "next/image";
import { Filter } from "../types";
import { useFilterParam } from "../hooks/useFilterParam";

export default function FilterFoodCategory({ filters }: { filters: Filter[] }) {
  const [selectedCategories, toggleCategory] = useFilterParam("category");

  return (
    <nav className="flex h-20 min-h-20 w-full gap-2.5 items-center overflow-x-scroll  text-sm ">
      <ul className="flex h-20 min-h-20 w-full gap-2.5 items-center">
        {filters.map((filter) => (
          <li key={filter.id} className="h-full">
            <button
              className={` card-style min-w-40 w-40 h-full flex gap-2 justify-between relative cursor-pointer hover:bg-[var(--green)] hover:text-white ${
                selectedCategories.includes(filter.name.toLowerCase())
                  ? "bg-[var(--green)] text-white"
                  : ""
              }`}
              onClick={() => toggleCategory(filter.name.toLowerCase())}
            >
              <h3 className="pt-4 pl-3">{filter.name}</h3>
              <Image
                src={`${filter.image_url}`}
                alt={`Image of the food category: ${filter.name}`}
                width={80}
                height={80}
                className="overflow-hidden absolute left-22"
              />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
