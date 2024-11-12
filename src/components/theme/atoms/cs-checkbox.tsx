import { Checkbox, CheckboxProps } from "antd";

const CSCheckbox = (props: CheckboxProps) => {
  return <Checkbox {...props}>{props.children}</Checkbox>;
};

export default CSCheckbox;
