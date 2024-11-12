import { FormInstance, useForm } from "antd/es/form/Form";
import usePaginatedApi from "../../../hooks/use-paginated-api";
import useQueryString from "../../../hooks/use-query-string";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import { QUERY_STRING } from "../../../utils/constants/query.constant";
import {
  IPaginatedApiResponse,
  IPaginatedQueryObject,
} from "../../../utils/interface/response.interface";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface ITemplateList {
  name: string;
  id: number;
}

export interface IUseForm {
  queryObj: IPaginatedQueryObject;
  handleStatus: (val: string) => void;
  templateList: IPaginatedApiResponse<ITemplateList[]> | undefined;
  templateListLoading: boolean;
  handleSearch: (data: { search: string }) => void;
  searchForm: FormInstance;
  setQuery: (_data: { [key: string]: string }) => boolean;
  createNewTemplate: () => void;
  navigate: NavigateFunction;
}

const useForms = (): IUseForm => {
  const [searchForm] = useForm();
  const navigate = useNavigate();
  const { getQuery, setQuery } = useQueryString();

  const query: IPaginatedQueryObject = {
    _page: 1,
    _limit: 10,
    _search: "",
  };

  const queryObj: IPaginatedQueryObject = {
    ...query,
    ...(getQuery([
      QUERY_STRING.PAGINATION.PAGE,
      QUERY_STRING.PAGINATION.LIMIT,
      QUERY_STRING.PAGINATION.SEARCH,
    ]) as Record<string, string>),
  };

  const { data: templateList, isLoading: templateListLoading } =
    usePaginatedApi<IPaginatedApiResponse<ITemplateList[]>>({
      key: [
        API_ROUTES.form.get,
        queryObj?._page ? queryObj._page.toString() : "",
        queryObj?._limit ? queryObj._limit.toString() : "",
        queryObj?._search ? queryObj._search.toString() : "",
      ],
      url: API_ROUTES.form.get,
      query: {
        page: queryObj._page,
        limit: queryObj._limit,
        ...(queryObj._search && { search: queryObj._search }),
      },
    });

  const handleStatus = (value: string) => {
    setQuery({ [QUERY_STRING.TEMPLATE.STATUS]: value });
  };

  const handleSearch = (data: { search: string }) => {
    setQuery({ [QUERY_STRING.PAGINATION.SEARCH]: data.search });
  };

  const createNewTemplate = () => {
    navigate("new");
  };

  //   const fetchPDF = async () => {
  //     const response = await fetch("http://localhost:3002/generate-pdf", {
  //       method: "get",
  //     });
  //     if (!response.ok) {
  //       console.log("ERROR in fetchPDF() : ", response);
  //     }

  //     const pdfBlob = await response.blob();
  //     const pdfUrl = URL.createObjectURL(pdfBlob);
  //     window.open(pdfUrl, "_blank");
  //   };
  return {
    queryObj,
    handleStatus,
    templateList,
    templateListLoading,
    handleSearch,
    searchForm,
    setQuery,
    createNewTemplate,
    navigate,
  };
};

export default useForms;
