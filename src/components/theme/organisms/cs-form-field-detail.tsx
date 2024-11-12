import { Form, Typography } from "antd";
import CSButton from "../atoms/cs-button";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import CSInput from "../atoms/cs-input";
import CSSelect from "../atoms/cs-select";
import CSCheckbox from "../atoms/cs-checkbox";

const CSFormFieldDetail = () => {
  return (
    <>
      <Typography.Title level={4}>Form Fields Detail</Typography.Title>

      <Form.List name="form_fields">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index: number) => (
              <div key={key} className="form-detail-row">
                <p>{index + 1}. </p>
                <div className="form-detail-field-cont">
                  <Form.Item
                    {...restField}
                    name={[name, "name"]}
                    rules={[{ required: true, message: "" }]}
                  >
                    <CSInput
                      placeholder="Field Name"
                      style={{ width: "180px" }}
                      size="small"
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "type"]}
                    rules={[{ required: true, message: "" }]}
                  >
                    <CSSelect
                      size="small"
                      placeholder="Field Type"
                      options={[
                        { label: "Input", value: "INPUT" },
                        { label: "Checkbox", value: "CHECKBOX" },
                        { label: "Radio", value: "RADIO" },
                        { label: "Textarea", value: "TEXTAREA" },
                        { label: "Sentence", value: "SENTENCE" },
                        { label: "Date", value: "DATE" },
                        { label: "File", value: "FILE" },
                      ]}
                      style={{ width: "110px" }}
                    />
                  </Form.Item>

                  <Form.Item {...restField} name={[name, "mapper"]}>
                    <CSInput
                      size="small"
                      placeholder="Field Mapper Name"
                      style={{ width: "180px" }}
                    />
                    {/* )} */}
                  </Form.Item>
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
                  <Form.Item
                    valuePropName="checked"
                    {...restField}
                    name={[name, "has_attachment"]}
                  >
                    <div style={{ display: "flex" }}>
                      <CSCheckbox defaultChecked={false}>Attachment</CSCheckbox>
                      {/* <Form.List name={[name, "list"]}>
                {(subFields, subOpt) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      rowGap: 10,
                    }}
                  >
                    {subFields.map((subField) => (
                      <Space key={subField.key} direction="horizontal">
                        <Form.Item
                          noStyle
                          name={[subField.name, "formFieldId"]}
                        >
                          <CSSelect
                            placeholder="Attached Form Field"
                            showSearch
                            size="small"
                          />
                        </Form.Item>
                        <MinusCircleOutlined
                          onClick={() => {
                            subOpt.remove(subField.name);
                          }}
                        />
                      </Space>
                    ))}
                    <CSButton
                      type="text"
                      onClick={() => subOpt.add()}
                      block
                      size="small"
                    >
                      + Add
                    </CSButton>
                  </div>
                )}
              </Form.List> */}
                    </div>
                  </Form.Item>
                  <CloseOutlined onClick={() => remove(name)} />
                </div>
              </div>
            ))}
            <Form.Item>
              <CSButton
                type="text"
                onClick={() => add()}
                style={{ marginTop: 10 }}
                icon={<PlusOutlined />}
              >
                New Form Field
              </CSButton>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default CSFormFieldDetail;
