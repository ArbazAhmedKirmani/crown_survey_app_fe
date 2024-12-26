import { Col, DatePicker, Form, Modal, Popconfirm, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import usePostApi from "../../../hooks/use-post-api";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import useGetApi from "../../../hooks/use-get-api";
import { IJobFormResponse } from "../../screen/jobs/new-job";
import { IApiResponse } from "../../../utils/interface/response.interface";
import CSFormItem from "../atoms/cs-form-item";
import CSSelect from "../atoms/cs-select";
import { useForm } from "antd/es/form/Form";
import CSButton from "../atoms/cs-button";
import CSInput from "../atoms/cs-input";
import { QUERY_STRING } from "../../../utils/constants/query.constant";
import useQueryString from "../../../hooks/use-query-string";
// import { debounce } from "lodash";
import { AnyObject } from "antd/es/_util/type";
import dayjs from "dayjs";
import { useState } from "react";
import { debounce } from "lodash";
import CSTextarea from "../atoms/cs-textarea";

interface ICSJobCreate {
  name: string;
  formId: number;
}
export interface ICSNewJobModal {
  onCancel?: () => void;
  initialValue?: any;
}
export interface IUserListResponse {
  id: number;
  name: String;
  email: string;
}

const CSNewJobModal = (props: ICSNewJobModal) => {
  const navigate = useNavigate();
  const [form] = useForm();
  const [customerForm] = useForm();
  const { getQuery, setQuery, removeQuery } = useQueryString();
  const [visibleNewCustomer, setVisibleNewCustomer] = useState<boolean>(false);

  const cs_name = getQuery(QUERY_STRING.OTHER_PARAMS.CUSTOMER_NAME) as string;
  const jobId = getQuery(QUERY_STRING.OTHER_PARAMS.JOB_ID) as string;

  const { data: formList, isLoading: formListLoading } = useGetApi<
    IApiResponse<IJobFormResponse[]>
  >({
    key: [API_ROUTES.jobs.getForms],
    url: API_ROUTES.jobs.getForms,
  });
  const { data: user, isLoading: usersLoading } = useGetApi<
    IApiResponse<IUserListResponse[]>
  >({
    key: [API_ROUTES.users.get],
    url: API_ROUTES.users.get,
  });

  const { data: customerList, isLoading: customerLoading } = useGetApi<
    IApiResponse<any[]>
  >({
    key: [API_ROUTES.customer.get, cs_name],
    url: API_ROUTES.customer.get,
    query: { search: cs_name },
    options: { staleTime: 4000 },
    onSuccess: () => {
      console.log(customerList?.data);
    },
  });

  const { isLoading: jobListLoading } = useGetApi<IApiResponse<any>>({
    key: [API_ROUTES.jobs.getById, jobId],
    url: API_ROUTES.jobs.getById(jobId),
    enabled: Boolean(jobId && jobId !== "new"),
    onSuccess: (data: AnyObject) => {
      form.setFieldsValue({
        id: data.data.id,
        customerId: data.data.customer.id,
        address: data.data.address,
        formId: data.data.form.id,
        fulfil_date: dayjs(data.data.fulfilDate),
      });
    },
  });

  const { mutate: mutateJob, isPending: jobLoading } = usePostApi<
    ICSJobCreate,
    { id: string }
  >({
    url: API_ROUTES.jobs.post,
    onSuccess: (data) => {
      navigate(`/jobs/${data.data.id}`);
    },
  });

  const searchCustomerSync = debounce((value) => {
    if (Boolean(value)) {
      setQuery({
        [QUERY_STRING.OTHER_PARAMS.CUSTOMER_NAME]: value,
      });
    } else {
      removeQuery(QUERY_STRING.OTHER_PARAMS.CUSTOMER_NAME);
    }
  }, 800);

  return (
    <Modal
      open={Boolean(jobId)}
      closable={true}
      footer={false}
      title="Create New Job"
      maskClosable={false}
      centered
      onCancel={() => {
        removeQuery(QUERY_STRING.OTHER_PARAMS.JOB_ID);
        form.resetFields();
        props?.onCancel?.();
      }}
      destroyOnClose={true}
      width={"60vw"}
      loading={jobListLoading}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={props?.initialValue}
        onFinish={(value: ICSJobCreate) => {
          if (jobId === "new") {
            mutateJob(value);
          } else {
          }
        }}
      >
        <Row gutter={10}>
          <Col xs={24} sm={12} md={12} lg={12}>
            <CSFormItem
              label="Customer"
              name={"customerId"}
              style={{ marginBottom: 0 }}
              rules={[{ required: true, message: "Customer is required" }]}
              extra={
                <Popconfirm
                  icon={false}
                  destroyTooltipOnHide={true}
                  title={"Instant Customer"}
                  okButtonProps={{
                    htmlType: "submit",
                  }}
                  okText="Create Customer"
                  onCancel={() => setVisibleNewCustomer(false)}
                  onConfirm={async () => {
                    try {
                      await customerForm.validateFields();
                      setVisibleNewCustomer(false);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  description={
                    <Form form={customerForm} layout="vertical">
                      <Row>
                        <Col span={24}>
                          <CSFormItem
                            name={"name"}
                            rules={[{ required: true, message: "" }]}
                          >
                            <CSInput placeholder="Name" />
                          </CSFormItem>
                        </Col>
                        <Col span={24}>
                          <CSFormItem
                            name={"email"}
                            rules={[{ required: true, message: "" }]}
                          >
                            <CSInput placeholder="Email" />
                          </CSFormItem>
                        </Col>
                        <Col span={24}>
                          <CSFormItem
                            // label="Customer Phone"
                            name={"phone"}
                            rules={[{ required: true, message: "" }]}
                          >
                            <CSInput placeholder="Phone" />
                          </CSFormItem>
                        </Col>
                      </Row>
                    </Form>
                  }
                  open={visibleNewCustomer}
                  arrowContent
                  placement="right"
                >
                  <a
                    type="text"
                    onClick={() => {
                      setVisibleNewCustomer((prev) => !prev);
                    }}
                  >
                    Create Instant Customer?
                  </a>
                </Popconfirm>
              }
            >
              <CSSelect
                showSearch
                // allowClear
                placeholder="Select Customer"
                loading={customerLoading}
                fieldNames={{ label: "name", value: "id" }}
                options={customerList?.data}
                disabled={Boolean(jobId !== "new")}
                onSearch={(val) => searchCustomerSync(val)}
              />
            </CSFormItem>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <CSFormItem
              label="Form"
              name={"formId"}
              style={{ marginBottom: 5 }}
              rules={[{ required: true, message: "Form is required" }]}
              extra={<Link to={"/forms/new"}>Create New Form</Link>}
            >
              <CSSelect
                showSearch
                allowClear
                placeholder="Select Form"
                loading={formListLoading}
                options={formList?.data?.map((x) => ({
                  label: x.name,
                  value: x.id,
                }))}
                disabled={Boolean(jobId !== "new")}
              />
            </CSFormItem>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <CSFormItem label="Author" name={"authorId"}>
              <CSSelect
                showSearch
                allowClear
                placeholder="Select Author"
                loading={usersLoading}
                options={user?.data?.map((x) => ({
                  label: x.name,
                  value: x.id,
                }))}
              />
            </CSFormItem>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <CSFormItem
              label="Fulfilment Date"
              name={"fulfil_date"}
              rules={[
                { required: true, message: "Filfilment Date is required" },
              ]}
            >
              <DatePicker
                placeholder="Fulfilment Date"
                style={{ width: "100%" }}
              />
            </CSFormItem>
          </Col>
          <Col span={24}>
            <CSFormItem
              label="Address"
              name={"address"}
              rules={[{ required: true, message: "Address is required" }]}
            >
              <CSTextarea placeholder="Complete Property Address" rows={2} />
            </CSFormItem>
          </Col>
          <Col span={24} style={{ textAlign: "right" }}>
            <CSButton htmlType="submit" type="primary" loading={jobLoading}>
              {jobId !== "new" ? "Update Form" : "Create Form"}
            </CSButton>
          </Col>
        </Row>
      </Form>
      {/* <List bordered loading={formListLoading || jobLoading}>
        {formList?.data?.length ? (
          formList?.data.map((_form, index: number) => (
            <List.Item
              key={_form.id.toString() + index.toString()}
              style={{ cursor: "pointer" }}
              onClick={() => mutateJob({ formId: +_form.id, name: _form.name })}
            >
              <strong>{_form.name}</strong>
            </List.Item>
          ))
        ) : (
          <Empty description="No Forms Found" />
        )}
      </List> */}
    </Modal>
  );
};

export default CSNewJobModal;
