import { Col, Form, FormListFieldData, Row, Table } from "antd";
import CSButton from "../atoms/cs-button";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import CSInput from "../atoms/cs-input";
import CSSelect from "../atoms/cs-select";
import { FormFieldType } from "../../../utils/enum/general.enum";
import CSCheckbox from "../atoms/cs-checkbox";
import { ColumnGroupType } from "antd/lib/table";
import { ColumnType } from "antd/es/table";

const CSFormFieldDetail = (props: { name: number }) => {
  const columns: (
    | ColumnGroupType<FormListFieldData>
    | ColumnType<FormListFieldData>
  )[] = [
    {
      title: "Name",
      key: "name",
      render: (_, { name, ...restField }: FormListFieldData) => (
        <>
          <Form.Item {...restField} name={[name, "id"]} hidden={true}>
            <input type="hidden" />
          </Form.Item>
          <Form.Item
            {...restField}
            name={[name, "name"]}
            rules={[{ required: true, message: "" }]}
          >
            <CSInput placeholder="Name" size="small" />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Type",
      key: "type",
      render: (_, { name, ...restField }: FormListFieldData) => (
        <Form.Item
          {...restField}
          name={[name, "type"]}
          rules={[{ required: true, message: "" }]}
        >
          <CSSelect
            size="small"
            placeholder="Field Type"
            options={[
              { label: "Input", value: FormFieldType.INPUT },
              {
                label: "Checkbox",
                value: FormFieldType.CHECKBOX,
              },
              { label: "Radio", value: FormFieldType.RADIO },
              {
                label: "Textarea",
                value: FormFieldType.TEXTAREA,
              },
              {
                label: "Sentence",
                value: FormFieldType.SENTENCE,
              },
              { label: "Date", value: FormFieldType.DATE },
              { label: "File", value: FormFieldType.FILE },
              { label: "Table", value: FormFieldType.TABLE },
            ]}
            style={{ minWidth: 120 }}
          />
        </Form.Item>
      ),
    },
    {
      title: "Mapper Name",
      key: "mapperName",
      render: (_, { name, ...restField }: FormListFieldData) => (
        <Form.Item
          {...restField}
          name={[name, "mapperName"]}
          rules={[{ required: true, message: "" }]}
        >
          <CSInput placeholder="Mapper Name" size="small" />
        </Form.Item>
      ),
    },
    {
      title: "Order No.",
      key: "orderNo",
      render: (_, { name, ...restField }: FormListFieldData) => (
        <Form.Item
          {...restField}
          name={[name, "orderNo"]}
          rules={[{ required: true, message: "" }]}
        >
          <CSInput placeholder="Order No." size="small" />
        </Form.Item>
      ),
    },
    {
      title: "Placeholder",
      key: "placeholder",
      render: (_, { name, ...restField }: FormListFieldData) => (
        <Form.Item
          {...restField}
          name={[name, "placeholder"]}
          rules={[{ required: true, message: "" }]}
        >
          <CSInput placeholder="Placeholder" size="small" />
        </Form.Item>
      ),
    },
    {
      title: "Required",
      key: "required",
      render: (_, { name, ...restField }: FormListFieldData) => (
        <Form.Item
          {...restField}
          valuePropName="checked"
          name={[name, "required"]}
          rules={[{ required: true, message: "" }]}
        >
          <CSCheckbox></CSCheckbox>
        </Form.Item>
      ),
    },
    {
      title: "Rating",
      key: "rating",
      render: (_, { name, ...restField }: FormListFieldData) => (
        <Form.Item
          {...restField}
          valuePropName="checked"
          name={[name, "rating"]}
          rules={[{ required: true, message: "" }]}
        >
          <CSCheckbox></CSCheckbox>
        </Form.Item>
      ),
    },
    {
      title: "Attachments",
      key: "attachments",
      render: (_, { name, ...restField }: FormListFieldData) => (
        <Form.Item
          {...restField}
          valuePropName="checked"
          name={[name, "attachments"]}
          rules={[{ required: true, message: "" }]}
        >
          <CSCheckbox></CSCheckbox>
        </Form.Item>
      ),
    },
  ];

  return (
    <div className="cs-form-field-detail">
      <Form.List
        initialValue={[
          {
            id: undefined,
            name: "",
            mapperName: "",
            required: false,
            attachments: false,
            rating: false,
          },
        ]}
        name={[props.name, "form_fields"]}
      >
        {(fields, { add, remove }) => (
          <div className="ant-table ant-table-small">
            <Table
              rowClassName="form-fields-row"
              size="small"
              dataSource={fields}
              columns={columns}
              pagination={false}
              indentSize={300}
              rowKey={(row) => row.key.toString() + row.name}
              footer={() => (
                <div>
                  <Form.Item>
                    <CSButton
                      onClick={() => add()}
                      style={{ marginTop: 10 }}
                      icon={<PlusOutlined />}
                    >
                      New Field
                    </CSButton>
                  </Form.Item>
                </div>
              )}
            />
            {/* <div className="ant-table-container">
              <div className="ant-table-content">
                <table style={{ tableLayout: "auto" }}>
                  <thead className="ant-table-thead">
                    <tr className="ant-table-row ant-table-row-level-0">
                      <td className="ant-table-cell">Name</td>
                      <td className="ant-table-cell">Type</td>
                      <td className="ant-table-cell">Mapper Name</td>
                      <td className="ant-table-cell">Order No.</td>
                      <td className="ant-table-cell">Placeholder</td>
                      <td className="ant-table-cell">Required</td>
                      <td className="ant-table-cell">Rating</td>
                      <td className="ant-table-cell">Attachments</td>
                      <td className="ant-table-cell">Action</td>
                    </tr>
                  </thead>
                  <tbody className="ant-table-tbody">
                    {fields.map(({ key, name, ...restField }) => (
                      <tr>
                        <td className="ant-table-cell" key={key}>
                          <Form.Item
                            {...restField}
                            name={[name, "id"]}
                            hidden={true}
                          >
                            <input type="hidden" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "name"]}
                            rules={[{ required: true, message: "" }]}
                          >
                            <CSInput placeholder="Field Name" size="small" />
                          </Form.Item>
                        </td>
                        <td className="ant-table-cell">
                          <Form.Item
                            {...restField}
                            name={[name, "type"]}
                            rules={[{ required: true, message: "" }]}
                          >
                            <CSSelect
                              size="small"
                              placeholder="Field Type"
                              options={[
                                { label: "Input", value: FormFieldType.INPUT },
                                {
                                  label: "Checkbox",
                                  value: FormFieldType.CHECKBOX,
                                },
                                { label: "Radio", value: FormFieldType.RADIO },
                                {
                                  label: "Textarea",
                                  value: FormFieldType.TEXTAREA,
                                },
                                {
                                  label: "Sentence",
                                  value: FormFieldType.SENTENCE,
                                },
                                { label: "Date", value: FormFieldType.DATE },
                                { label: "File", value: FormFieldType.FILE },
                                { label: "Table", value: FormFieldType.TABLE },
                              ]}
                              style={{ minWidth: 120 }}
                            />
                          </Form.Item>
                        </td>
                        <td className="ant-table-cell">
                          <Form.Item
                            {...restField}
                            name={[name, "mapper"]}
                            rules={[{ required: true, message: "" }]}
                          >
                            <CSInput
                              size="small"
                              placeholder="Field Mapper Name"
                            />
                          </Form.Item>
                        </td>
                        <td className="ant-table-cell">
                          <Form.Item
                            {...restField}
                            name={[name, "orderNo"]}
                            rules={[
                              {
                                required: true,
                                message: "",
                              },
                            ]}
                          >
                            <CSInput
                              placeholder="Order"
                              type="number"
                              style={{ width: "80px" }}
                              size="small"
                            />
                          </Form.Item>
                        </td>
                        <td className="ant-table-cell">
                          <Form.Item
                            {...restField}
                            name={[name, "placeholder"]}
                          >
                            <CSInput
                              placeholder="placeholder"
                              type="text"
                              // style={{ width: "80px" }}
                              size="small"
                            />
                          </Form.Item>
                        </td>
                        <td className="ant-table-cell">
                          <Form.Item
                            valuePropName="checked"
                            {...restField}
                            name={[name, "required"]}
                          >
                            <div style={{ display: "flex" }}>
                              <CSCheckbox>Required</CSCheckbox>
                            </div>
                          </Form.Item>
                        </td>
                        <td className="ant-table-cell">
                          <Form.Item
                            valuePropName="checked"
                            {...restField}
                            name={[name, "rating"]}
                          >
                            <div style={{ display: "flex" }}>
                              <CSCheckbox>Rating</CSCheckbox>
                            </div>
                          </Form.Item>
                        </td>
                        <td className="ant-table-cell">
                          <Form.Item
                            {...restField}
                            valuePropName="checked"
                            name={[name, "attachments"]}
                          >
                            <div style={{ display: "flex" }}>
                              <CSCheckbox>Attachments</CSCheckbox>
                            </div>
                          </Form.Item>
                        </td>
                        <td className="ant-table-cell">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              color: "tomato",
                            }}
                          >
                            <CloseOutlined onClick={() => remove(name)} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Row>
                  <Col span={24}>
                    <Form.Item>
                      <CSButton
                        onClick={() => add()}
                        style={{ marginTop: 10 }}
                        icon={<PlusOutlined />}
                      >
                        New Field
                      </CSButton>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </div> */}
          </div>
        )}
      </Form.List>
    </div>
  );
};

export default CSFormFieldDetail;
