"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useFilterParam(
  key: string
): [string[], (value: string) => void] {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selected = searchParams.get(key)?.split(",") || [];

  const toggle = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      let values = params.get(key)?.split(",") || [];

      if (values.includes(value)) {
        values = values.filter((v) => v !== value);
      } else {
        values.push(value);
      }

      if (values.length > 0) {
        params.set(key, values.join(","));
      } else {
        params.delete(key);
      }

      router.push(`/?${params.toString()}`);
    },
    [key, router, searchParams]
  );

  return [selected, toggle];
}
