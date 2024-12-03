import { AnyObject } from "antd/es/_util/type";
import CSTableForm from "../../theme/organisms/cs-table-view";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import usePaginatedApi from "../../../hooks/use-paginated-api";
import { IPaginatedApiResponse } from "../../../utils/interface/response.interface";
import useQueryString from "../../../hooks/use-query-string";
import { QUERY_STRING } from "../../../utils/constants/query.constant";
import usePostApi from "../../../hooks/use-post-api";
import { AxiosMethodEnum } from "../../../utils/enum/general.enum";
import CSTableAction from "../../theme/molecules/cs-table-action";
import { useState } from "react";

const Forms = () => {
  const [formId, setFormId] = useState<number | null>(null);
  const { getQuery } = useQueryString();
  const page = getQuery(QUERY_STRING.PAGINATION.PAGE);
  const limit = getQuery(QUERY_STRING.PAGINATION.LIMIT);
  const search = getQuery(QUERY_STRING.PAGINATION.SEARCH);

  const { mutate: deleteMutate, isPending } = usePostApi({
    url: API_ROUTES.form.delete(formId?.toString()!),
    query: {
      ...(page && { page: page as string }),
      ...(limit && { limit: limit as string }),
      ...(search && { search: search as string }),
    },
    method: AxiosMethodEnum.DELETE,
    invalidate: [[API_ROUTES.form.get, limit as string, page as string]],
  });

  const handleDelete = (id: number | string) => {
    setFormId(+id);
    deleteMutate({});
  };

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
        <CSTableAction
          id={record?.id}
          handleDelete={handleDelete}
          record={record}
        />
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
