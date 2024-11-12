import { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import useGetApi from "./use-get-api";

interface Props {
  key: string[];
  url: string;
  query?: { [key: string]: string | number | boolean };
  options?: Omit<UseQueryOptions, "queryKey" | "enabled">;
  pagination?: { take?: number; limit?: number };
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  currentPage: number;
  nextPage: number;
  lastPage?: number;
  prevPage: number;
}

function usePaginatedApi<T>({
  key,
  url,
  options,
  query = {},
  pagination,
}: Props): UseQueryResult<T> {
  const limit: string =
    pagination?.limit?.toString() ??
    query?.limit?.toString() ??
    // getQuery(QUERY_STRING.PAGINATION.LIMIT) ??
    "10";
  const page: string =
    query?.page?.toString() ??
    pagination?.take?.toString() ??
    // getQuery(QUERY_STRING.PAGINATION.PAGE) ??
    "1";

  let apiRoute: string = url;
  const queryKey = key;
  const queryObj = query;

  if (limit) {
    queryObj.limit = limit;
    queryKey.push(JSON.stringify({ ...queryObj, limit }));
  }

  if (page) {
    queryObj.page = page;
    queryKey.push(JSON.stringify({ ...queryObj, page }));
  }
  const queryString = Object.keys(queryObj)
    .map((key) => `${key}=${queryObj[key]}`)
    .join("&");

  if (queryString) {
    apiRoute += `?${queryString}`;
  }

  return useGetApi<T>({
    key: queryKey,
    url: apiRoute,
    ...options,
  });
}

export default usePaginatedApi;
