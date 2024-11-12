import { Button, Form, Table } from "antd";
import useTemplate, { IUseTemplate } from "./useTemplate";
import CSButton from "../../theme/atoms/cs-input";
import CSButton from "../../theme/atoms/cs-button";
import CSFormItem from "../../theme/atoms/cs-form-item";
import { QUERY_STRING } from "../../../utils/constants/query.constant";
import { DeleteColumnOutlined } from "@ant-design/icons";

const Template = () => {
  const {
    // handleStatus,
    queryObj,
    handleSearch,
    templateList,
    searchForm,
    templateListLoading,
    setQuery,
    createNewTemplate,
  }: // DefaultStatus,
  IUseTemplate = useTemplate();

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

  return (
    <>
      <Form form={searchForm} onFinish={handleSearch}>
        <div className="searchbar">
          <CSFormItem name="search">
            <CSButton placeholder="Search" />
          </CSFormItem>
          <CSButton
            htmlType="button"
            type="primary"
            onClick={createNewTemplate}
          >
            Create New Template
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
      <Table
        loading={templateListLoading}
        dataSource={templateList?.data as readonly [] | undefined}
        columns={columns}
        size="small"
        pagination={{
          total: templateList?.totalCount,
          pageSize: +queryObj._limit,
          current: +queryObj._page,
          // onChange: (page, pageSize) =>
        }}
        scroll={{ x: 300 }}
        onChange={(page) =>
          setQuery({
            [QUERY_STRING.PAGINATION.PAGE]: page.current?.toString() ?? "1",
          })
        }
        footer={() => (
          <p className="">Total {templateList?.totalCount} Templates</p>
        )}
      />
    </>
  );
};

export default Template;
