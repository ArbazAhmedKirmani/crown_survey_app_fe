import { Divider, Form, Typography } from "antd";
import CSButton from "../atoms/cs-button";
import CSInput from "../atoms/cs-input";
import CSFormFieldDetail from "./cs-form-field-detail";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const CSFormSectionDetail = () => {
  return (
    <Form.List name="section">
      {(fields, { add: addSection, remove: removeSection }) => {
        return (
          <div className="cs-form-section-detail">
            <Typography.Title level={4}>Form Sections</Typography.Title>
            {fields.map((field, index) => (
              <div key={field.key}>
                <Divider>Section {field.key + 1}</Divider>
                <div className="form-detail-field-cont">
                  <Form.Item name={[index, "id"]} hidden={true}>
                    <input type="hidden" />
                  </Form.Item>
                  <Form.Item
                    name={[index, "name"]}
                    rules={[{ required: true, message: "" }]}
                  >
                    <CSInput placeholder="Section Name" />
                  </Form.Item>
                  <Form.Item
                    name={[index, "prefix"]}
                    rules={[
                      { required: true, message: "" },
                      { max: 3, message: "Max 3 Characters" },
                    ]}
                  >
                    <CSInput placeholder="Prefix" />
                  </Form.Item>
                  <Form.Item
                    name={[index, "order"]}
                    rules={[{ required: true, message: "" }]}
                  >
                    <CSInput placeholder="Section Order" type="number" />
                  </Form.Item>
                </div>

                <CSFormFieldDetail id={index} />

                {fields.length > 1 ? (
                  <CSButton
                    // type="danger"
                    className="dynamic-delete-button"
                    onClick={() => removeSection(field.name)}
                    icon={<MinusCircleOutlined />}
                  >
                    Remove Section
                  </CSButton>
                ) : null}
              </div>
            ))}
            <Divider />
            <Form.Item>
              <CSButton
                type="primary"
                onClick={() => addSection()}
                style={{ width: "10rem" }}
              >
                <PlusOutlined /> Add Section
              </CSButton>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
};

export default CSFormSectionDetail;
