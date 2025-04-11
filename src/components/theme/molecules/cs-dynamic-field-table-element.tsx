import { IFormFieldResponse } from "../organisms/cs-dynamic-fields-renderer";
import { Form } from "antd";
import CSFormItem from "../atoms/cs-form-item";
import CSInput from "../atoms/cs-input";
import CSButton from "../atoms/cs-button";
import { DeleteOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";

interface ICSDynamicFieldTableElement {
  nestedProps: IFormFieldResponse;
  form: Object;
  mutateFn: (val: any) => void;
}

const CSDynamicFieldTableElement = ({
  mutateFn,
  form,
  nestedProps,
}: ICSDynamicFieldTableElement) => {
  const [nestForm] = useForm();

  useEffect(() => {
    nestForm.setFieldsValue(form);
  }, [form]);

  return (
    <Form form={nestForm}>
      <Form.List name={nestedProps.mapperName}>
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((item, index) => (
                <div
                  key={item.key}
                  style={{ display: "flex", gap: 10, margin: "0 0 10px" }}
                >
                  {nestedProps.values?.map?.((x: string, ind: number) => (
                    <CSFormItem
                      key={x + ind}
                      label={x}
                      name={[index, x]}
                      // rules={[{ required: props.required, message: "" }]}
                    >
                      <CSInput />
                    </CSFormItem>
                  ))}
                  <CSButton
                    type="text"
                    style={{ color: "tomato", marginTop: 21 }}
                    icon={<DeleteOutlined />}
                    onClick={() => remove(index)}
                  />
                </div>
              ))}
              <CSButton
                type="primary"
                onClick={() => add()}
                style={{ marginBottom: 10 }}
              >
                Add Element
              </CSButton>
            </div>
          );
        }}
      </Form.List>
      <CSButton
        htmlType="button"
        onClick={() => {
          mutateFn(nestForm.getFieldsValue());
        }}
      >
        Save
      </CSButton>
    </Form>
  );
};

export default CSDynamicFieldTableElement;
