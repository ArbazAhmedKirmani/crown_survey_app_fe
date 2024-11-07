import { FormItemLayout } from "antd/es/form/Form";
import FormItem, { FormItemProps } from "antd/es/form/FormItem";
import { PropsWithChildren } from "react";
import "./style.scss";

export interface ICustomFormItem extends PropsWithChildren<FormItemProps> {
  layout?: FormItemLayout;
}

const CustomFormItem = (props: ICustomFormItem) => {
  return (
    <FormItem className="custom-form-item" {...props}>
      {props.children}
    </FormItem>
  );
};

export default CustomFormItem;
