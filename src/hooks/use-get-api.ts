import {
  UseQueryResult,
  useQuery,
  QueryFunction,
  QueryKey,
  QueryClient,
  UndefinedInitialDataOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import HTTP from "../service/http.service";
import { useEffect } from "react";

type UseGetApi<R> = {
  key: QueryKey;
  url: string;
  options?: Omit<
    UndefinedInitialDataOptions<
      unknown,
      AxiosError<{ message: string }>,
      R,
      QueryKey
    >,
    "queryKey" | "queryFn" | "enabled"
  >;
  customQueryFn?: QueryFunction;
  enabled?: boolean;
  query?: Record<string, unknown>;
  queryClient?: QueryClient;
  onSuccess?: (data: R) => void;
};

const _api = new HTTP();
export default function useGetApi<R>({
  key,
  url,
  enabled = true,
  query,
  options,
  queryClient,
  onSuccess,
}: UseGetApi<R>): UseQueryResult<R, AxiosError<{ message: string }>> {
  const queryResult = useQuery(
    {
      queryKey: key,
      queryFn: async () => {
        try {
          const response = await _api.call<undefined, R>({
            url,
            query,
          });

          return Promise.resolve(response?.data);
        } catch (error) {
          return Promise.reject(error);
        }
      },

      refetchOnWindowFocus: false,
      retry: 3,
      gcTime: 1000 * 60 * 1,
      enabled,

      ...options,
    },
    queryClient
  );
  const { data, isSuccess } = queryResult;

  useEffect(() => {
    if (isSuccess && data && onSuccess) {
      onSuccess?.(data);
    }
  }, [isSuccess]);

  return queryResult;
}

// queryFn: customQueryFn
//       ? customQueryFn
//       : async () => {
//           const response = await _api.call<
//             D,
//             R & { totalCount: number | undefined }
//           >({ url, query });
//           return response.data?.totalCount ? response : response.data;
//         },
//     ...{
//       refetchOnWindowFocus: false,
//       cacheTime: 1000 * 60 * 5,
//       retry: 3,
//       ...options,
//     },
