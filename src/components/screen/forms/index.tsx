import { Button, Form } from "antd";
import CSFormItem from "../../theme/atoms/cs-form-item";
import { EditFilled } from "@ant-design/icons";
import useForms, { IUseForm } from "./useForm";
import _ from "lodash";
import CSInput from "../../theme/atoms/cs-input";
import CSButton from "../../theme/atoms/cs-button";
import CSTable from "../../theme/atoms/cs-table";
import { AnyObject } from "antd/es/_util/type";
import { QUERY_STRING } from "../../../utils/constants/query.constant";

const Forms = () => {
  const {
    queryObj,
    handleSearch,
    templateList,
    searchForm,
    templateListLoading,
    setQuery,
    navigate,
    createNewTemplate,
  }: IUseForm = useForms();

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
        <Button type="text" onClick={() => navigate(`${record.id}`)}>
          <EditFilled />
        </Button>
      ),
    },
  ];

  const debouncedSearch = _.debounce((value: string) => {
    setQuery({
      [QUERY_STRING.PAGINATION.SEARCH]: value || "",
      [QUERY_STRING.PAGINATION.PAGE]: "1",
    });
  }, 300);

  return (
    <div className="form-container">
      <Form form={searchForm} onFinish={handleSearch}>
        <div className="searchbar">
          <CSFormItem name="search">
            <CSInput
              placeholder="Search"
              autoComplete="off"
              onChange={(e) => debouncedSearch(e.target.value)}
            />
          </CSFormItem>
          <CSButton
            htmlType="button"
            type="primary"
            onClick={createNewTemplate}
          >
            New Form
          </CSButton>
        </div>
      </Form>
      {/* <Segmented
            options={["Pending", "In-Progress", "Completed", "Rejected"]}
            block
            onChange={handleStatus}
            value={queryObj._temp_status ?? DefaultStatus}
            defaultValue="Pending"
          /> */}
      <CSTable
        loading={templateListLoading}
        dataSource={templateList?.data as readonly [] | undefined}
        columns={columns}
        size="small"
        pagination={{
          responsive: true,
          total: templateList?.totalCount,
          pageSize: +queryObj._limit,
          current: +queryObj._page,
          onChange: (page) => {
            setQuery({ [QUERY_STRING.PAGINATION.PAGE]: page.toString() });
          },
        }}
        scroll={{ x: 300 }}
        onChange={(page) =>
          setQuery({
            [QUERY_STRING.PAGINATION.PAGE]: page.current?.toString() ?? "1",
          })
        }
        footer={() => (
          <p className="table-footer">
            Showing {templateList?.data?.length} / {templateList?.totalCount}{" "}
            Templates
          </p>
        )}
      />
    </div>
  );
};

export default Forms;
