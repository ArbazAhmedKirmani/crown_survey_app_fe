import { FormItemLayout } from "antd/es/form/Form";
import FormItem, { FormItemProps } from "antd/es/form/FormItem";
import "./style.scss";

export interface ICSFormItem extends FormItemProps {
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
