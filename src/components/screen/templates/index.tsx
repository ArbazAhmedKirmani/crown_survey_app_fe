import { Button } from "antd";
import { DeleteColumnOutlined } from "@ant-design/icons";
import CSTableForm from "../../theme/organisms/cs-table-view";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import { IPaginatedApiResponse } from "../../../utils/interface/response.interface";
import { AnyObject } from "antd/es/_util/type";
import usePaginatedApi from "../../../hooks/use-paginated-api";
import useQueryString from "../../../hooks/use-query-string";
import { QUERY_STRING } from "../../../utils/constants/query.constant";

const Template = () => {
  const { getQuery } = useQueryString();
  const page = getQuery(QUERY_STRING.PAGINATION.PAGE);
  const limit = getQuery(QUERY_STRING.PAGINATION.LIMIT);
  const search = getQuery(QUERY_STRING.PAGINATION.SEARCH);

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
      render: () => (
        <Button type="text">
          <DeleteColumnOutlined />
        </Button>
      ),
    },
  ];

  const { data, isLoading } = usePaginatedApi<
    IPaginatedApiResponse<AnyObject[]>
  >({
    key: [API_ROUTES.templates.get, limit as string, page as string],
    url: API_ROUTES.templates.get,
    query: {
      ...(page && { page: page as string }),
      ...(limit && { limit: limit as string }),
      ...(search && { search: search as string }),
    },
  });

  return (
    <CSTableForm
      columns={columns}
      newBtnTitle="New Template"
      data={data}
      loading={isLoading}
    />
  );
};

export default Template;
