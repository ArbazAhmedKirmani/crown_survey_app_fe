import CSTableForm from "../../theme/organisms/cs-table-view";
import useQueryString from "../../../hooks/use-query-string";
import { QUERY_STRING } from "../../../utils/constants/query.constant";
import CSSegmented from "../../theme/atoms/cs-segments";
import { valuesIn } from "lodash";
import { JobStatusEnum } from "../../../utils/enum/general.enum";
import { SegmentedValue } from "antd/es/segmented";
import { IPaginatedApiResponse } from "../../../utils/interface/response.interface";
import usePaginatedApi from "../../../hooks/use-paginated-api";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";

interface IJobsResponse {
  id: number;
  name: string;
}

const Jobs = () => {
  const { setQuery, getQuery } = useQueryString();
  const status: string =
    (getQuery(QUERY_STRING.OTHER_PARAMS.STATUS) as string) ||
    JobStatusEnum.PENDING;

  const handleChange = (value: SegmentedValue) => {
    setQuery({ [QUERY_STRING.OTHER_PARAMS.STATUS]: value as string });
  };

  const columns = [{ key: "name", dataIndex: "name", title: "Name" }];

  const { data, isLoading } = usePaginatedApi<
    IPaginatedApiResponse<IJobsResponse[]>
  >({
    key: [API_ROUTES.jobs.get, status],
    url: API_ROUTES.jobs.get,
    query: { status: status.toUpperCase() },
  });

  return (
    <div>
      <CSTableForm
        columns={columns}
        newBtnTitle="New Job"
        data={data}
        navigateUrl="new"
        loading={isLoading}
        centerSection={
          <CSSegmented
            options={valuesIn(JobStatusEnum)}
            allowFullScreen={true}
            onChange={handleChange}
            value={status}
            style={{ marginBottom: 5 }}
          />
        }
      />
    </div>
  );
};

export default Jobs;
