import { FormItemProps } from "antd/lib";
import CSFormItem from "./cs-form-item";
import CSSelect, { ICSSelect } from "./cs-select";
import { IApiResponse } from "../../../utils/interface/response.interface";
import { AnyObject } from "antd/es/_util/type";
import useGetApi from "../../../hooks/use-get-api";
import { useEffect, useState } from "react";
// import { debounce } from "lodash";

export interface ICSSearchSelect {
  formFieldProps: FormItemProps;
  selectProps: Partial<ICSSelect>;
  url: string;
}

const CSSearchSelect = (props: ICSSearchSelect) => {
  // const [search, setSearch] = useState("");
  const [searchOptions, setSearchOptions] = useState<AnyObject[]>([]);

  /** GET Fields API */
  const { isLoading, refetch } = useGetApi<IApiResponse<AnyObject[]>>({
    key: [
      props.url,
      // search
    ],
    url: props.url,
    // query: {
    //   search: search,
    // },
    enabled: false,
    onSuccess: (_data) => {
      //   debugger;
      setSearchOptions([..._data.data]);
    },
  });

  // const handleSearch = debounce(() => {
  //   refetch();
  // }, 500);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <CSFormItem {...props.formFieldProps}>
      <CSSelect
        allowClear
        showSearch
        options={searchOptions}
        loading={isLoading}
        // onSearch={(val) => {
        //   setSearch(val);
        //   handleSearch();
        // }}
        filterOption={(input, option) =>
          option?.label && typeof option?.label === "string"
            ? option.label.toLowerCase().includes(input.toLowerCase())
            : false
        }
        {...props.selectProps}
      />
    </CSFormItem>
  );
};

export default CSSearchSelect;
