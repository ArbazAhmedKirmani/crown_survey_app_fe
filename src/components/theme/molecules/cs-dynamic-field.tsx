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
const CSDynamicField = ({ type, nestedProps }: ICSDynamicField) => {
  const getTypeField = () => {
    if (type)
      switch (type) {
        // case FormFieldType.FILE:
        //   return <CSDynamicField.FILE {...nestedProps} />;
        case FormFieldType.INPUT:
          return <CSDynamicField.INPUT {...nestedProps} />;
        case FormFieldType.CHECKBOX:
          return <CSDynamicField.CHECKBOX {...nestedProps} />;
        case FormFieldType.RADIO:
          return <CSDynamicField.RADIO {...nestedProps} />;
        case FormFieldType.DATE:
          return <CSDynamicField.DATE {...nestedProps} />;
        case FormFieldType.TEXTAREA:
          return <CSDynamicField.SENTENCE {...nestedProps} />;
        case FormFieldType.SENTENCE:
          return <CSDynamicField.SENTENCE {...nestedProps} />;
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
  return <TextArea {...props} rows={5} />;
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
