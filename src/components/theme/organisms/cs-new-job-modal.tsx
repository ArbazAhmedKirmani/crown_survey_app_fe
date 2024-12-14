import { Col, Form, Modal, Row } from "antd";
import { useNavigate } from "react-router-dom";
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
import { debounce } from "lodash";

interface ICSJobCreate {
  name: string;
  formId: number;
}
export interface ICSNewJobModal {
  open: boolean;
  onCancel: () => void;
  initialValue?: any;
}

const CSNewJobModal = (props: ICSNewJobModal) => {
  const navigate = useNavigate();
  const [form] = useForm();
  const { getQuery, setQuery, removeQuery } = useQueryString();

  const cs_name = getQuery(QUERY_STRING.OTHER_PARAMS.CUSTOMER_NAME) as string;

  const { data: formList, isLoading: formListLoading } = useGetApi<
    IApiResponse<IJobFormResponse[]>
  >({
    key: [API_ROUTES.jobs.getForms],
    url: API_ROUTES.jobs.getForms,
    enabled: props.open,
  });

  const {
    data: customerList,
    isLoading: customerLoading,
    refetch: refetchCustomer,
  } = useGetApi<IApiResponse<any[]>>({
    key: [API_ROUTES.customer.get],
    url: API_ROUTES.customer.get(cs_name),
    enabled: Boolean(cs_name),
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

  const refetchCustomerSync = debounce(() => {
    refetchCustomer();
  }, 1000);

  return (
    <Modal
      open={props.open}
      closable={true}
      footer={false}
      title="Create New Job"
      maskClosable={false}
      centered
      onCancel={props.onCancel}
      destroyOnClose
      width={"60vw"}
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={props?.initialValue}
        onFinish={(value: ICSJobCreate) => mutateJob(value)}
      >
        <Row gutter={[10, 10]}>
          <Col xs={24} sm={12} md={12} lg={12}>
            <CSFormItem label="Customer" name={"customerId"}>
              <CSSelect
                showSearch
                allowClear
                loading={customerLoading}
                options={customerList?.data?.map((x) => ({
                  label: x.name,
                  value: x.id,
                }))}
                onSearch={(value: string) => {
                  Boolean(value)
                    ? setQuery({
                        [QUERY_STRING.OTHER_PARAMS.CUSTOMER_NAME]: value,
                      })
                    : removeQuery(QUERY_STRING.OTHER_PARAMS.CUSTOMER_NAME);
                  refetchCustomerSync();
                }}
              />
            </CSFormItem>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <CSFormItem label="Form" name={"customerId"}>
              <CSSelect
                showSearch
                allowClear
                loading={formListLoading}
                options={formList?.data?.map((x) => ({
                  label: x.name,
                  value: x.id,
                }))}
              />
            </CSFormItem>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <CSFormItem label="Author" name={"authorId"}>
              <CSSelect
                showSearch
                allowClear
                loading={formListLoading}
                options={formList?.data?.map((x) => ({
                  label: x.name,
                  value: x.id,
                }))}
              />
            </CSFormItem>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <CSFormItem label="Fulfilment Date" name={"fulfil_date"}>
              <CSInput type="date" placeholder="Fulfilment Date" />
            </CSFormItem>
          </Col>
          <Col span={24}>
            <CSButton htmlType="submit" type="primary" loading={jobLoading}>
              Create Form
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
