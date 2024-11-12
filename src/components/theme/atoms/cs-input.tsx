import { Input, InputNumber, InputNumberProps, InputProps } from "antd";
import Search from "../../../assets/icons/search.svg";

export type CSButtonProps = InputProps;
export type CSButtonNumber = InputNumberProps;

const CSInput = (props: InputProps) => {
  return <Input {...props} className={`cs-input ${props.className}`} />;
};

CSInput.Password = ({ ...props }: CSButtonProps) => {
  return <Input.Password {...props} />;
};

CSInput.Search = ({ className, ...props }: CSButtonProps) => {
  return <Input className={className} {...props} suffix={<Search />} />;
};

CSInput.Number = ({ className, suffix, ...props }: CSButtonNumber) => {
  return <InputNumber className={className} suffix={suffix} {...props} />;
};

export default CSInput;
