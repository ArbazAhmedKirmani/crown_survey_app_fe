import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { AnyObject } from "antd/es/_util/type";
import CSTableForm from "../../theme/organisms/cs-table-view";
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import usePaginatedApi from "../../../hooks/use-paginated-api";
import { IPaginatedApiResponse } from "../../../utils/interface/response.interface";
import useQueryString from "../../../hooks/use-query-string";
import { QUERY_STRING } from "../../../utils/constants/query.constant";
import { Tooltip } from "antd";
import usePostApi from "../../../hooks/use-post-api";
import { AxiosMethodEnum } from "../../../utils/enum/general.enum";

const Forms = () => {
  const navigate = useNavigate();
  const { getQuery } = useQueryString();
  const page = getQuery(QUERY_STRING.PAGINATION.PAGE);
  const limit = getQuery(QUERY_STRING.PAGINATION.LIMIT);
  const search = getQuery(QUERY_STRING.PAGINATION.SEARCH);

  const { mutate: deleteMutate, isPending } = usePostApi<
    { id: number },
    unknown
  >({
    url: API_ROUTES.form.get,
    query: {
      ...(page && { page: page as string }),
      ...(limit && { limit: limit as string }),
      ...(search && { search: search as string }),
    },
    invalidate: [[API_ROUTES.form.get, limit as string, page as string]],
    method: AxiosMethodEnum.DELETE,
  });

  const columns = [
    {
      title: "Form Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Prefix",
      dataIndex: "prefix",
      key: "prefix",
    },
    {
      title: "Actions",
      dataIndex: "name",
      key: "name",
      width: 120,
      render: (_: string, record: AnyObject) => (
        <div>
          <Tooltip rootClassName="cs-tooltip" placement="top" title="Edit">
            <span
              onClick={() => navigate(`${record.id}`)}
              style={{ cursor: "pointer", padding: 8, color: "#0876cb" }}
            >
              <EditFilled />
            </span>
          </Tooltip>
          <Tooltip rootClassName="cs-tooltip" placement="top" title="Delete">
            <span
              onClick={() => deleteMutate({ id: record.id })}
              style={{ cursor: "pointer", padding: 8, color: "#d91818" }}
            >
              <DeleteFilled />
            </span>
          </Tooltip>
        </div>
      ),
    },
  ];

  const { data, isLoading } = usePaginatedApi<
    IPaginatedApiResponse<AnyObject[]>
  >({
    key: [API_ROUTES.form.get, limit as string, page as string],
    url: API_ROUTES.form.get,
    query: {
      ...(page && { page: page as string }),
      ...(limit && { limit: limit as string }),
      ...(search && { search: search as string }),
    },
  });

  return (
    <CSTableForm
      columns={columns}
      newBtnTitle="New Form"
      footer={false}
      loading={isLoading || isPending}
      data={data}
    />
  );
};

export default Forms;
