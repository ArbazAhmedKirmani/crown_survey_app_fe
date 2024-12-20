import { SelectProps } from "antd";
import CSSelect from "../atoms/cs-select";
import useGetApi from "../../../hooks/use-get-api";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import { useParams } from "react-router-dom";
import { IApiResponse } from "../../../utils/interface/response.interface";
import {
  AxiosMethodEnum,
  JobStatusEnum,
} from "../../../utils/enum/general.enum";
import { keysIn } from "lodash";
import usePostApi from "../../../hooks/use-post-api";

interface ICSJobStatus extends SelectProps {}

const CSJobStatus = (props: ICSJobStatus) => {
  const params = useParams();
  let { data, isLoading } = useGetApi<IApiResponse<{ status: JobStatusEnum }>>({
    key: [API_ROUTES.jobs.status(params.id), params.id],
    url: API_ROUTES.jobs.status(params.id),
  });

  const { mutate, isPending } = usePostApi<
    { status: JobStatusEnum },
    { status: JobStatusEnum }
  >({
    url: API_ROUTES.jobs.status(params.id),
    method: AxiosMethodEnum.PUT,
    onSuccess: (_data) => {
      if (data) {
        data.data.status = _data?.data?.status;
      }
    },
  });

  return (
    <CSSelect
      value={data?.data.status}
      loading={isLoading || isPending}
      style={{ width: "8rem" }}
      options={keysIn(JobStatusEnum).map((x) => {
        const label = x[0] + x.slice(1, x.length).toLowerCase();
        return {
          value: x,
          label: label,
        };
      })}
      {...props}
      onChange={(e) => {
        mutate({ status: e });
      }}
    />
  );
};

export default CSJobStatus;
