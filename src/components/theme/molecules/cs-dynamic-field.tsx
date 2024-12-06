import { PropsWithChildren } from "react";
import CSFormItem from "../atoms/cs-form-item";
import { Checkbox, DatePicker, Radio, Upload, UploadProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import CSInput from "../atoms/cs-input";
import { FormFieldType } from "../../../utils/enum/general.enum";
import { IFormFieldResponse } from "../organisms/cs-dynamic-fields-renderer";
import moment from "moment";

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
      valuePropName={"checked"}
      rules={[{ required: props.required, message: "" }]}
    >
      <Checkbox.Group options={props?.values?.split(",")} />
    </CSFormItem>
  );
};
CSDynamicField.SENTENCE = (props: any) => {
  return (
    <CSFormItem
      name={props.mapperName}
      rules={[{ required: props.required, message: "" }]}
    >
      <TextArea {...props} rows={9} />
    </CSFormItem>
  );
};
CSDynamicField.RADIO = (props: any) => {
  return (
    <CSFormItem
      name={props.mapperName}
      rules={[{ required: props.required, message: "" }]}
    >
      <Radio.Group options={props?.values?.split(",")} {...props} />
    </CSFormItem>
  );
};
CSDynamicField.INPUT = (props: any) => {
  return (
    <CSFormItem
      name={props.mapperName}
      rules={[{ required: props.required, message: "" }]}
    >
      <CSInput {...props} name={props?.mapperName} />
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
      <CSInput {...props} type="date" />
    </CSFormItem>
  );
};

export default CSDynamicField;
