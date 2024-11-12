import {
  MutationFunction,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import HTTP from "../service/http.service";
import { AxiosMethodEnum } from "../utils/enum/general.enum";
import { notification } from "antd";
import { IApiResponse } from "../utils/interface/response.interface";

const _api = new HTTP();

interface UseCallApiProps<D, R> {
  url?: string;
  onSuccess?: (data: IApiResponse<R>) => void;
  onError?: (data: string) => void;
  showErrorMessage?: boolean;
  showSuccessMessage?: boolean;
  successMessage?: string;
  customMutationFn?:
    | MutationFunction<IApiResponse<R>, D | undefined>
    | undefined;
  method?: AxiosMethodEnum;
  invalidate?: string[][];
  query?: { [key in string]: string | number | boolean };
  queryParam?: { [key in string]: string | number | boolean };
}

export default function usePostApi<D, R>({
  url = "",
  showErrorMessage = true,
  showSuccessMessage,
  successMessage,
  customMutationFn,
  onSuccess,
  query,
  onError,
  invalidate,
  method = AxiosMethodEnum.POST,
  ...options
}: UseCallApiProps<D, R>): UseMutationResult<
  IApiResponse<R>,
  AxiosError,
  D | undefined
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: customMutationFn
      ? async (data) => customMutationFn(data)
      : async (data?: D) => {
          try {
            const response = await _api.call<D, IApiResponse<R>>({
              url,
              method,
              body: data,
              query,
            });

            if (response.data) return response.data;
            else return Promise.reject(response);
          } catch (error) {
            return Promise.reject(error);
          }
        },
    onError: (err: AxiosError<{ message: string }>) => {
      if (showErrorMessage)
        notification.error({
          message: "Error",
          description: err?.response?.data?.message ?? "Something went wrong",
          placement: "bottomRight",
        });
      if (onError) onError("err");
    },
    onSuccess: (data) => {
      if (showSuccessMessage || successMessage)
        notification.success({
          message: "Success",
          description: successMessage || data?.message || "Success",
          placement: "bottomRight",
        });

      if (invalidate?.length)
        invalidate.forEach((query) =>
          queryClient.invalidateQueries({ queryKey: query })
        );
      if (onSuccess) onSuccess(data);
    },
    // mutationKey: [url],
    ...options,
  });
}
