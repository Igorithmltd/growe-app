"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useQueryParams = (path?: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const setQueryParams = (key: string, value: string) => {
    router.push(path ?? pathname + "?" + createQueryString(key, value));
  };

  const getQueryParams = (value: string) => {
    return searchParams.get(value);
  };

  return { setQueryParams, getQueryParams };
};
