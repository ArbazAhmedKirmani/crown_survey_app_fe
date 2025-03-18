import { Drawer, Form } from "antd";
import useQueryString from "../../../hooks/use-query-string";
import { QUERY_STRING } from "../../../utils/constants/query.constant";
import CSFormItem from "../atoms/cs-form-item";
import CSInput from "../atoms/cs-input";
import CSButton from "../atoms/cs-button";
import { DeleteOutlined } from "@ant-design/icons";
import useGetApi from "../../../hooks/use-get-api";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";
import { useParams } from "react-router-dom";
import { IApiResponse } from "../../../utils/interface/response.interface";
import CSTable from "../atoms/cs-table";
import usePostApi from "../../../hooks/use-post-api";
import { AxiosMethodEnum } from "../../../utils/enum/general.enum";
import { useForm } from "antd/es/form/Form";
import CSSearchSelect from "../atoms/cs-search-select";

export interface ICSFormFieldIdentifier {
  identifier: string;
  reference: string;
  id: number;
}

const CSFormFieldIdentifier = () => {
  const [form] = useForm();
  const param = useParams();
  const { getQuery, setQuery, removeQuery } = useQueryString();

  const formFieldIndentifier = getQuery(
    QUERY_STRING.OTHER_PARAMS.FORM_FIELD_IDENTIFIER
  );
  const formId = param.id;

  const { data, isLoading } = useGetApi<IApiResponse<ICSFormFieldIdentifier[]>>(
    {
      key: [API_ROUTES.formFieldReference.get(formId!), formId!],
      url: API_ROUTES.formFieldReference.get(formId!),
      enabled: !!formId,
    }
  );

  // const { data: fieldList, isLoading: fieldLoading } = useGetApi<
  //   IApiResponse<any[]>
  // >({
  //   key: [API_ROUTES.jobs.getFieldByForm(formId!), formId],
  //   url: API_ROUTES.jobs.getFieldByForm(formId!),
  //   enabled: Boolean(formId),
  // });

  const { mutate, isPending } = usePostApi({
    url: API_ROUTES.formFieldReference.post,
    method: AxiosMethodEnum.POST,
    showSuccessMessage: true,
    invalidate: [[API_ROUTES.formFieldReference.get(formId!), formId!]],
  });

  const toggleSidebar = () => {
    if (!Boolean(formFieldIndentifier))
      setQuery({
        [QUERY_STRING.OTHER_PARAMS.FORM_FIELD_IDENTIFIER]: "open",
      });
    else removeQuery(QUERY_STRING.OTHER_PARAMS.FORM_FIELD_IDENTIFIER);
  };

  const submitIdentifier = (val: FormData) => {
    mutate({ ...val, formId: Number(formId) });
  };

  return (
    <div className="cs-form-field-identifier">
      <CSButton className="crud-btn" onClick={toggleSidebar}>
        Form Indentifiers
      </CSButton>

      <Drawer
        rootClassName="cs-form-field-identifier-drawer"
        title="Form Field Identifiers"
        onClose={toggleSidebar}
        placement="right"
        open={Boolean(formFieldIndentifier)}
        width={"40%"}
        loading={isLoading}
      >
        <Form form={form} layout="vertical" onFinish={submitIdentifier}>
          <CSFormItem
            name={"identifier"}
            label={"Identifier"}
            rules={[{ required: true, message: "Identifier is required" }]}
          >
            <CSInput placeholder="Identifier" />
          </CSFormItem>
          <CSFormItem
            name={"reference"}
            label={"Reference"}
            rules={[{ required: true, message: "Reference is required" }]}
          >
            <CSInput placeholder="Reference" />
          </CSFormItem>

          <CSSearchSelect
            selectProps={{
              placeholder: "Field",
              fieldNames: {
                label: "name",
                value: "id",
              },
            }}
            formFieldProps={{
              name: "fieldId",
              label: "Field",
              rules: [{ required: true, message: "Field is required" }],
            }}
            url={API_ROUTES.jobs.getFieldByForm(formId!)}
          />

          <div className="submit-button">
            <CSButton type="primary" htmlType="submit" loading={isPending}>
              Save
            </CSButton>
          </div>
        </Form>

        <div className="list-table">
          <CSTable
            size="small"
            columns={[
              {
                key: "identifier",
                dataIndex: "identifier",
                title: "Identifier",
              },
              {
                key: "reference",
                dataIndex: "reference",
                title: "Reference",
              },
              {
                key: "fieldName",
                dataIndex: ["field", "name"],
                title: "Field",
              },
              {
                key: "Actions",
                title: "Actions",
                width: 100,
                render: () => <DeleteOutlined onClick={() => {}} />,
              },
            ]}
            dataSource={data?.data}
            rowKey={(ref) => ref.id}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default CSFormFieldIdentifier;
