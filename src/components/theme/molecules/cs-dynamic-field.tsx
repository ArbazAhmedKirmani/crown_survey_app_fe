import { PropsWithChildren } from "react";
import CSFormItem from "../atoms/cs-form-item";
import CSCheckbox from "../atoms/cs-checkbox";
import {
  CheckboxProps,
  DatePicker,
  DatePickerProps,
  InputProps,
  Radio,
  RadioProps,
  Upload,
  UploadProps,
} from "antd";
import TextArea, { TextAreaProps } from "antd/es/input/TextArea";
import CSInput from "../atoms/cs-input";
import { FormFieldType } from "../../../utils/enum/general.enum";
import { IFormFieldResponse } from "../organisms/cs-dynamic-fields-renderer";

export interface ICSDynamicField extends PropsWithChildren {
  type?: FormFieldType;
  nestedProps?: IFormFieldResponse;
}
const CSDynamicField = ({ type }: ICSDynamicField) => {
  const getTypeField = () => {
    if (type)
      switch (type) {
        case FormFieldType.FILE:
          return <CSDynamicField.FILE />;
        case FormFieldType.INPUT:
          return <CSDynamicField.INPUT />;
        case FormFieldType.CHECKBOX:
          return <CSDynamicField.CHECKBOX />;
        case FormFieldType.RADIO:
          return <CSDynamicField.RADIO />;
        case FormFieldType.DATE:
          return <CSDynamicField.DATE />;
        case FormFieldType.TEXTAREA:
          return <CSDynamicField.SENTENCE />;
        case FormFieldType.SENTENCE:
          return <CSDynamicField.SENTENCE />;
        default:
          break;
      }
  };

  return <CSFormItem>{getTypeField()}</CSFormItem>;
};

CSDynamicField.CHECKBOX = (props: CheckboxProps) => {
  return <CSCheckbox {...props} />;
};
CSDynamicField.SENTENCE = (props: TextAreaProps) => {
  return <TextArea {...props} />;
};
CSDynamicField.RADIO = (props: RadioProps) => {
  return <Radio {...props} />;
};
CSDynamicField.INPUT = (props: InputProps) => {
  return <CSInput {...props} />;
};
CSDynamicField.FILE = (props: UploadProps) => {
  return <Upload {...props} />;
};
CSDynamicField.DATE = (props: DatePickerProps) => {
  return <DatePicker {...props} />;
};

export default CSDynamicField;
