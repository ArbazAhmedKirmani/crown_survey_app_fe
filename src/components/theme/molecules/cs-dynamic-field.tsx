import { PropsWithChildren } from "react";
import CSFormItem from "../atoms/cs-form-item";
import { Checkbox, Form, Radio, Upload, UploadProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import CSInput from "../atoms/cs-input";
import { FormFieldType } from "../../../utils/enum/general.enum";
import { IFormFieldResponse } from "../organisms/cs-dynamic-fields-renderer";
import CSButton from "../atoms/cs-button";
import { DeleteOutlined } from "@ant-design/icons";

export interface ICSDynamicField extends PropsWithChildren {
  type?: FormFieldType;
  nestedProps?: IFormFieldResponse;
  onChange?: any;
}
const CSDynamicField = ({ type, nestedProps, onChange }: ICSDynamicField) => {
  const getTypeField = () => {
    if (type)
      switch (type) {
        case FormFieldType.INPUT:
          return <CSDynamicField.INPUT onChange={onChange} {...nestedProps} />;
        case FormFieldType.CHECKBOX:
          return (
            <CSDynamicField.CHECKBOX onChange={onChange} {...nestedProps} />
          );
        case FormFieldType.RADIO:
          return <CSDynamicField.RADIO onChange={onChange} {...nestedProps} />;
        case FormFieldType.DATE:
          return <CSDynamicField.DATE onChange={onChange} {...nestedProps} />;
        case FormFieldType.TEXTAREA:
          return (
            <CSDynamicField.SENTENCE onChange={onChange} {...nestedProps} />
          );
        case FormFieldType.SENTENCE:
          return (
            <CSDynamicField.SENTENCE onChange={onChange} {...nestedProps} />
          );
        case FormFieldType.TABLE_ELEMENT:
          return (
            <CSDynamicField.TABLE_ELEMENT
              onChange={onChange}
              {...nestedProps}
            />
          );
        default:
          break;
      }
  };

  return <CSFormItem>{getTypeField()}</CSFormItem>;
};

CSDynamicField.CHECKBOX = (props: any) => {
  return (
    <CSFormItem
      name={props.mapperName}
      rules={[{ required: props.required, message: "" }]}
    >
      <Checkbox.Group
        key={props.mapperName}
        name={props.mapperName}
        options={props?.values?.split(",")}
      />
    </CSFormItem>
  );
};
CSDynamicField.SENTENCE = (props: any) => {
  return (
    <CSFormItem
      name={props.mapperName}
      rules={[{ required: props.required, message: "" }]}
    >
      <TextArea rows={9} placeholder={props.placeholder} />
    </CSFormItem>
  );
};
CSDynamicField.RADIO = (props: any) => {
  return (
    <CSFormItem
      name={props.mapperName}
      rules={[{ required: props.required, message: "" }]}
    >
      <Radio.Group options={props?.values?.split(",")} />
    </CSFormItem>
  );
};
CSDynamicField.INPUT = (props: any) => {
  return (
    <CSFormItem
      name={props.mapperName}
      rules={[{ required: props.required, message: "" }]}
    >
      <CSInput placeholder={props.placeholder} />
    </CSFormItem>
  );
};
CSDynamicField.FILE = (props: UploadProps) => {
  return <Upload {...props} />;
};
CSDynamicField.DATE = (props: any) => {
  return (
    <CSFormItem
      name={props.mapperName}
      rules={[{ required: props.required, message: "" }]}
    >
      <CSInput type="date" />
    </CSFormItem>
  );
};
CSDynamicField.TABLE_ELEMENT = (props: any) => {
  return (
    <Form.List name={props.mapperName}>
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((item, index) => (
              <div
                key={item.key}
                style={{ display: "flex", gap: 10, margin: "0 0 10px" }}
              >
                <CSFormItem
                  label="Element Name"
                  name={[index, "name"]}
                  rules={[{ required: props.required, message: "" }]}
                >
                  <CSInput />
                </CSFormItem>
                <CSFormItem label="Element Desc" name={[index, "desc"]}>
                  <CSInput />
                </CSFormItem>
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
  );
};

export default CSDynamicField;
