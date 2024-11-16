import { Col, Form, Row, Tag, Typography } from "antd";
import CSButton from "../atoms/cs-button";
import CSInput from "../atoms/cs-input";
import CSFormFieldDetail from "./cs-form-field-detail";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import CSFormItem from "../atoms/cs-form-item";

const CSFormSectionDetail = () => {
  return (
    <div className="form-section-detail">
      <Typography.Title level={4}>Form Sections</Typography.Title>

      <Form.List name={["form_section"]}>
        {(subFields, { add, remove }) => (
          <>
            {subFields.map(({ key, name, ...restField }) => (
              <div key={key} className="form-section-box">
                <div className="form-detail-row">
                  <div className="form-detail-field-cont">
                    <Form.Item {...restField} name={[name, "id"]}>
                      <input type="hidden" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      rules={[{ required: true, message: "" }]}
                    >
                      <CSInput placeholder="Section Name" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "prefix"]}
                      rules={[
                        { required: true, message: "" },
                        { max: 3, message: "Max 3 Characters" },
                      ]}
                    >
                      <CSInput placeholder="Prefix" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "order"]}
                      rules={[{ required: true, message: "" }]}
                    >
                      <CSInput placeholder="Section Order" type="number" />
                    </Form.Item>
                  </div>
                </div>
                <Row>
                  <Col>
                    <Typography.Title level={5}>Form Fields</Typography.Title>

                    <CSFormItem name={[name, "form_field"]}>
                      <CSFormFieldDetail name={name} />
                    </CSFormItem>
                  </Col>
                </Row>

                <Tag
                  color="red"
                  onClick={() => remove(name)}
                  className="section-delete-btn"
                >
                  <CloseOutlined /> Delete Section
                </Tag>
              </div>
            ))}
            <Row>
              <Col span={24}>
                <CSButton
                  type="text"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  New Section
                </CSButton>
              </Col>
            </Row>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default CSFormSectionDetail;
