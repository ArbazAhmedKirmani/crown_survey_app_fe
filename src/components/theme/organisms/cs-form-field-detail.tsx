import { Col, Form, Row } from "antd";
import CSButton from "../atoms/cs-button";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import CSInput from "../atoms/cs-input";
import CSSelect from "../atoms/cs-select";
// import CSCheckbox from "../atoms/cs-checkbox";

const CSFormFieldDetail = (props: { name: number }) => {
  return (
    <Form.List name={[props.name, "form_fields"]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }, index: number) => (
            <div key={key} className="form-detail-row">
              <p>{index + 1}. </p>
              <div className="form-detail-field-cont">
                <Form.Item {...restField} name={[name, "id"]}>
                  <input type="hidden" />
                </Form.Item>{" "}
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
                {/* <Form.Item
                  valuePropName="checked"
                  {...restField}
                  name={[name, "has_attachment"]}
                >
                  <div style={{ display: "flex" }}>
                    <CSCheckbox defaultChecked={false}>Attachment</CSCheckbox>
                  </div>
                </Form.Item> */}
                <CloseOutlined onClick={() => remove(name)} />
              </div>
            </div>
          ))}
          <Row>
            <Col span={24}>
              <Form.Item>
                <CSButton
                  type="text"
                  onClick={() => add()}
                  style={{ marginTop: 10 }}
                  icon={<PlusOutlined />}
                >
                  New Field
                </CSButton>
              </Form.Item>
            </Col>
          </Row>
        </>
      )}
    </Form.List>
  );
};

export default CSFormFieldDetail;
