"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function FilterFoodCategory() {
  const [filters, setFilters] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const dataFilters = await fetch(
        "https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api/filter"
      );
      const filters = await dataFilters.json();
      setFilters(filters.filters);
    }
    fetchData();
  }, []);
  console.log(filters);
  return (
    <section className="flex h-20 min-h-20 w-full gap-2.5 items-center overflow-x-auto  text-sm">
      <ul className="flex h-20 min-h-20 w-full gap-2.5 items-center overflow-x-auto  text-sm">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className="card-style min-w-40 w-40 h-full flex gap-2 justify-between relative cursor-pointer"
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
    </section>
  );
}
