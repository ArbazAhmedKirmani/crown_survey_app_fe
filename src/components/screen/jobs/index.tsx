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
import CSTableAction from "../../theme/molecules/cs-table-action";
import { AnyObject } from "antd/es/_util/type";

interface IJobsResponse {
  id: number;
  name: string;
}

const Jobs = () => {
  const { setQuery, getQuery } = useQueryString();

  const page = getQuery(QUERY_STRING.PAGINATION.PAGE) as string;
  const limit = getQuery(QUERY_STRING.PAGINATION.LIMIT) as string;
  const search = getQuery(QUERY_STRING.PAGINATION.SEARCH) as string;
  const status: string =
    (getQuery(QUERY_STRING.OTHER_PARAMS.STATUS) as string) ||
    JobStatusEnum.PENDING;

  const handleChange = (value: SegmentedValue) => {
    setQuery({ [QUERY_STRING.OTHER_PARAMS.STATUS]: value as string });
  };

  const columns = [
    { key: "name", dataIndex: "customer.name", title: "Customer Name" },
    { key: "email", dataIndex: "customer.email", title: "Email" },
    { key: "form", dataIndex: "name", title: "Form Name" },
    {
      key: "actions",
      title: "Actions",
      render: (_: any, record: AnyObject) => (
        <CSTableAction id={record.id} record={record} />
      ),
    },
  ];

  const { data, isLoading } = usePaginatedApi<
    IPaginatedApiResponse<IJobsResponse[]>
  >({
    key: [API_ROUTES.jobs.get, status, limit, page, search],
    url: API_ROUTES.jobs.get,
    query: {
      status: status.toUpperCase(),
      ...(page && { page: page as string }),
      ...(limit && { limit: limit as string }),
      ...(search && { search: search as string }),
    },
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
