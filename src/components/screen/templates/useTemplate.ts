import { FormInstance, useForm } from "antd/es/form/Form";
import usePaginatedApi from "../../../hooks/use-paginated-api";
import useQueryString from "../../../hooks/use-query-string";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import { QUERY_STRING } from "../../../utils/constants/query.constant";
import {
  IPaginatedApiResponse,
  IPaginatedQueryObject,
} from "../../../utils/interface/response.interface";
import { useNavigate } from "react-router-dom";

interface ITemplateList {
  name: string;
  id: number;
}

export interface IUseTemplate {
  queryObj: IPaginatedQueryObject & { _temp_status: string };
  handleStatus: (val: string) => void;
  templateList: IPaginatedApiResponse<ITemplateList[]> | undefined;
  templateListLoading: boolean;
  handleSearch: (data: { search: string }) => void;
  searchForm: FormInstance;
  setQuery: (_data: { [key: string]: string }) => boolean;
  DefaultStatus: "Pending";
  createNewTemplate: () => void;
}

const useTemplate = (): IUseTemplate => {
  const [searchForm] = useForm();
  const navigate = useNavigate();
  const { getQuery, setQuery } = useQueryString();

  const DefaultStatus = "Pending";

  const query: IPaginatedQueryObject & { _temp_status: string } = {
    _temp_status: DefaultStatus,
    _page: 1,
    _limit: 10,
    _search: "",
  };

  const queryObj: IPaginatedQueryObject & { _temp_status: string } = {
    ...query,
    ...(getQuery([
      QUERY_STRING.TEMPLATE.STATUS,
      QUERY_STRING.PAGINATION.PAGE,
      QUERY_STRING.PAGINATION.LIMIT,
      QUERY_STRING.PAGINATION.SEARCH,
    ]) as Record<string, string>),
  };

  const { data: templateList, isLoading: templateListLoading } =
    usePaginatedApi<IPaginatedApiResponse<ITemplateList[]>>({
      key: [API_ROUTES.templates.get],
      url: API_ROUTES.templates.get,
      query: {
        status: queryObj?._temp_status || DefaultStatus,
        page: queryObj._page,
        limit: queryObj._limit,
        search: queryObj._search,
      },
    });

  const handleStatus = (value: string) => {
    setQuery({ [QUERY_STRING.TEMPLATE.STATUS]: value });
  };

  const handleSearch = (data: { search: string }) => {
    setQuery({ [QUERY_STRING.PAGINATION.SEARCH]: data.search });
  };

  const createNewTemplate = () => {
    navigate("new-template");
  };

  return {
    queryObj,
    handleStatus,
    templateList,
    templateListLoading,
    handleSearch,
    searchForm,
    DefaultStatus,
    setQuery,
    createNewTemplate,
  };
};

export default useTemplate;
