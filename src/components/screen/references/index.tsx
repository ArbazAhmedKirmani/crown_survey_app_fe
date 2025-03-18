import { ColumnGroupType } from "antd/es/table";
import CSTableForm from "../../theme/organisms/cs-table-view";
import { AnyObject } from "antd/es/_util/type";
import { ColumnType } from "antd/lib/table";
import { IPaginatedApiResponse } from "../../../utils/interface/response.interface";
import usePaginatedApi from "../../../hooks/use-paginated-api";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import useQueryString from "../../../hooks/use-query-string";
import { QUERY_STRING } from "../../../utils/constants/query.constant";
import CSTableAction from "../../theme/molecules/cs-table-action";
import CSCheckbox from "../../theme/atoms/cs-checkbox";
import usePostApi from "../../../hooks/use-post-api";
import { useState } from "react";
import { AxiosMethodEnum } from "../../../utils/enum/general.enum";

const References = () => {
  const { getQuery } = useQueryString();

  const page = (getQuery(QUERY_STRING.PAGINATION.PAGE) as string) || "1";
  const search = getQuery(QUERY_STRING.PAGINATION.SEARCH) as string;
  const [reference, setReference] = useState(null);
  const column: (ColumnType<AnyObject> | ColumnGroupType<AnyObject>)[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      key: "category",
      render: (value) => value.category.name,
    },
    {
      title: "Site Note",
      key: "siteNote",
      render: (_, record) => <CSCheckbox checked={record.isSiteNote} />,
    },
    {
      title: "Description",
      dataIndex: "value",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record, index) => (
        <CSTableAction
          key={index}
          id={record.id}
          record={record}
          handleDelete={() => {
            setReference(record.id);
            mutate(record);
          }}
        />
      ),
    },
  ];

  const { data, isLoading } = usePaginatedApi<
    IPaginatedApiResponse<AnyObject[]>
  >({
    key: [API_ROUTES.reference.get, page, search],
    url: API_ROUTES.reference.get,
    query: {
      page,
      ...(search && { search }),
    },
  });

  const { mutate, isPending } = usePostApi({
    url: API_ROUTES.reference.getById(reference!),
    method: AxiosMethodEnum.DELETE,
    onSuccess: () => {
      setReference(null);
    },
    invalidate: [[API_ROUTES.reference.get, page, search]],
  });

  return (
    <CSTableForm
      columns={column}
      data={data}
      loading={isLoading || isPending}
      newBtnTitle="New Reference"
      navigateUrl="new"
    />
  );
};

export default References;
