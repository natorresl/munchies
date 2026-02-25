"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter } from "../types";

export default function FilterFoodCategory({ filters }: { filters: Filter[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategories =
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

  return (
    <nav className="flex h-20 min-h-20 w-full gap-2.5 items-center overflow-x-scroll  text-sm ">
      <ul className="flex h-20 min-h-20 w-full gap-2.5 items-center">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={` card-style min-w-40 w-40 h-full flex gap-2 justify-between relative cursor-pointer hover:bg-[var(--green)] hover:text-white ${
              selectedCategories.includes(filter.name.toLowerCase())
                ? "bg-[var(--green)] text-white"
                : ""
            }`}
            onClick={() => handleCategoryClick(filter.name.toLowerCase())}
          >
            <h3 className="pt-4 pl-3">{filter.name}</h3>
            <Image
              src={`${filter.image_url}`}
              alt={filter.name}
              width={80}
              height={80}
              className="overflow-hidden absolute left-22"
            />
          </button>
        ))}
      </ul>
    </nav>
  );
}
