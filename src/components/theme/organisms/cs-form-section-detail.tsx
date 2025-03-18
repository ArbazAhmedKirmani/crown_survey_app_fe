import { lazy, Suspense } from "react";
import { Collapse, Form, Popconfirm, Typography } from "antd";
import CSButton from "../atoms/cs-button";
import CSInput from "../atoms/cs-input";
import { DeleteFilled, PlusOutlined } from "@ant-design/icons";
import CSLayoutLoader from "../molecules/cs-layout-loader";
import useFormInstance from "antd/lib/form/hooks/useFormInstance";
import CSColorPicker from "../atoms/cs-color-picker";

const CSFormFieldDetail = lazy(() => import("./cs-form-field-detail"));

const CSFormSectionDetail = () => {
  const fromInstance = useFormInstance();
  console.log(fromInstance?.getFieldsValue());
  return (
    <Form.List name="section">
      {(fields, { add: addSection, remove: removeSection }) => {
        return (
          <div className="cs-form-section-detail">
            <Typography.Title level={4}>Form Sections</Typography.Title>
            <Collapse
              size="small"
              accordion
              items={fields.map((field, index) => ({
                key: field.key,
                label: <strong>Section {field.key + 1}</strong>,
                children: (
                  <div>
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
                      <Form.Item name={[index, "color"]}>
                        <CSColorPicker
                          size="small"
                          allowClear
                          showText
                          mode={["single", "gradient"]}
                        />
                      </Form.Item>
                      <Popconfirm
                        title="Delete Section"
                        description="Do your really want to delete?"
                        onConfirm={() => removeSection(field.name)}
                      >
                        <CSButton
                          className="dynamic-delete-button"
                          icon={<DeleteFilled />}
                          style={{ backgroundColor: "tomato", color: "white" }}
                        >
                          {/* Remove Section */}
                        </CSButton>
                      </Popconfirm>
                    </div>
                    <Suspense fallback={<CSLayoutLoader type="auth" />}>
                      <CSFormFieldDetail id={index} />
                    </Suspense>
                  </div>
                ),
              }))}
            />
            <Form.Item>
              <CSButton
                type="primary"
                onClick={() => addSection()}
                style={{ width: "10rem", marginTop: 10 }}
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
