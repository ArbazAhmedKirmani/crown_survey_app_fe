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
import { ReactNode } from "react";
import { IPaginatedApiResponse } from "../../../utils/interface/response.interface";

export interface ICustomQueryObject {
  apiName: string;
  queryName: string;
}

export interface ICSTableView {
  data: IPaginatedApiResponse<AnyObject[]> | undefined;
  columns: (ColumnType<AnyObject> | ColumnGroupType<AnyObject>)[];
  navigateUrl?: string;
  searchBarElements?: ReactNode;
  newBtnTitle: string;
  footer?: boolean;
  centerSection?: ReactNode;
  loading: boolean;
  customButton?: ReactNode;
}

/**
 * when searchBarElements are provided, it should be like : <><Col><FormItem><YOUR_ELEMENT></FormItem></Col> .._repeat_.. </>
 * @param  props
 * @returns
 */
const CSTableForm = (props: ICSTableView) => {
  const {
    loading,
    newBtnTitle,
    columns,
    navigateUrl = "new",
    searchBarElements,
    centerSection,
    footer,
    data,
    customButton,
  } = props;
  const { setQuery } = useQueryString();
  const navigate = useNavigate();

  const debouncedSearch = _.debounce((value: string) => {
    setQuery({
      [QUERY_STRING.PAGINATION.SEARCH]: value,
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
          {customButton ? (
            customButton
          ) : (
            <CSButton
              htmlType="button"
              type="primary"
              onClick={createNewTemplate}
            >
              {newBtnTitle}
            </CSButton>
          )}
        </Col>
      </Row>

      {/* Custom Middle Optional Render Section */}
      {centerSection}

      <CSTable
        loading={loading}
        dataSource={data?.data || []}
        columns={columns}
        size="small"
        pagination={{
          responsive: true,
          total: data?.totalCount,
          onChange: (page) => {
            setQuery({ [QUERY_STRING.PAGINATION.PAGE]: page.toString() });
          },
        }}
        footer={() =>
          footer ? (
            <p className="table-footer">
              Showing {data?.data?.length} / {data?.totalCount} Templates
            </p>
          ) : null
        }
        rowKey={(data) => data.id}
      />
    </div>
  );
};

export default CSTableForm;
