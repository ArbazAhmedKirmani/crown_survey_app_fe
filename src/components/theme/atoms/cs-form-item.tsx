import { FormItemLayout } from "antd/es/form/Form";
import FormItem, { FormItemProps } from "antd/es/form/FormItem";
import { PropsWithChildren } from "react";
import "./style.scss";

export interface ICSFormItem extends PropsWithChildren<FormItemProps> {
  layout?: FormItemLayout;
}

const CSFormItem = (props: ICSFormItem) => {
  return (
    <FormItem className="cs-form-item" {...props}>
      {props.children}
    </FormItem>
  );
};

export default CSFormItem;
