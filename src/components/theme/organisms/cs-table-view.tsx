import { Col, Row } from "antd";
import CSInput from "../atoms/cs-input";
import CSButton from "../atoms/cs-button";
import { QUERY_STRING } from "../../../utils/constants/query.constant";
import useQueryString from "../../../hooks/use-query-string";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import CSTable from "../atoms/cs-table";
import { ColumnType } from "antd/es/table";
import { AnyObject } from "antd/es/_util/type";
import { ColumnGroupType } from "antd/lib/table";
import { IPaginatedApiResponse } from "../../../utils/interface/response.interface";
import { ReactNode } from "react";
import usePaginatedApi from "../../../hooks/use-paginated-api";

export interface ICustomQueryObject {
  apiName: string;
  queryName: string;
}

export interface ICSTableView {
  url: string;
  columns: (ColumnType<AnyObject> | ColumnGroupType<AnyObject>)[];
  navigateUrl?: string;
  searchBarElements?: ReactNode;
  newBtnTitle: string;
  customQueryObject?: ICustomQueryObject[];
}

/**
 * when searchBarElements are provided, it should be like : <><Col><FormItem><YOUR_ELEMENT></FormItem></Col> .._repeat_.. </>
 * @param  props
 * @returns
 */
const CSTableForm = (props: ICSTableView) => {
  const {
    url,
    newBtnTitle,
    columns,
    navigateUrl = "new",
    searchBarElements,
    customQueryObject,
  } = props;
  const { setQuery, getQuery } = useQueryString();
  const navigate = useNavigate();

  const queryObj = (
    returnType: "array" | "obj"
  ):
    | {
        [x: string]: string | null;
      }
    | (string | null)[]
    | undefined => {
    let query: { [x: string]: string | null } = {};
    if (customQueryObject) {
      customQueryObject.forEach((item: ICustomQueryObject) => {
        const queryItem = getQuery(item.queryName)?.[`${item?.queryName}`];
        if (queryItem) query[item.apiName] = queryItem;
      });
    }

    query = {
      ...query,
      ...getQuery([
        QUERY_STRING.PAGINATION.PAGE,
        QUERY_STRING.PAGINATION.LIMIT,
        QUERY_STRING.PAGINATION.SEARCH,
      ]),
    };

    if (returnType === "array") return Object.values(query);

    if (returnType === "obj") return query;
  };

  const { data: data, isLoading } = usePaginatedApi<
    IPaginatedApiResponse<AnyObject[]>
  >({
    key: [url, ...(queryObj("array") as string[])],
    url: url,
    query: {
      ...(queryObj("obj") as { [key: string]: string | number | boolean }),
    },
  });

  const debouncedSearch = _.debounce((value: string) => {
    setQuery({
      [QUERY_STRING.PAGINATION.SEARCH]: value || "",
      [QUERY_STRING.PAGINATION.PAGE]: "1",
    });
  }, 300);

  const createNewTemplate = () => {
    navigate(navigateUrl);
  };

  return (
    <div className="cs-table-form">
      <Row
        gutter={[8, 8]}
        style={{ marginBottom: 10, justifyContent: "space-between" }}
      >
        <Col xl={4} lg={6} md={8} sm={10} xs={24}>
          <CSInput
            placeholder="Search"
            autoComplete="off"
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </Col>
        {searchBarElements && searchBarElements}
        <Col xl={3} lg={4} md={5} sm={8} xs={24} style={{ textAlign: "right" }}>
          <CSButton
            htmlType="button"
            type="primary"
            onClick={createNewTemplate}
          >
            {newBtnTitle}
          </CSButton>
        </Col>
      </Row>
      {/* <Segmented
        options={["Pending", "In-Progress", "Completed", "Rejected"]}
        block
        onChange={handleStatus}
        value={queryObj._temp_status ?? DefaultStatus}
        defaultValue="Pending"
      /> */}
      <CSTable
        loading={isLoading}
        dataSource={data?.data || []}
        columns={columns}
        size="small"
        pagination={{
          responsive: true,
          total: data?.totalCount,
          //   pageSize: +queryObj._limit || 10,
          //   current: +queryObj._page || 1,
          onChange: (page) => {
            setQuery({ [QUERY_STRING.PAGINATION.PAGE]: page.toString() });
          },
        }}
        onChange={(page) =>
          setQuery({
            [QUERY_STRING.PAGINATION.PAGE]: page.current?.toString() ?? "1",
          })
        }
        footer={() => (
          <p className="table-footer">
            Showing {data?.data?.length} / {data?.totalCount} Templates
          </p>
        )}
      />
    </div>
  );
};

export default CSTableForm;
