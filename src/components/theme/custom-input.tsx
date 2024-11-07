import { Input, InputNumber, InputNumberProps, InputProps } from "antd";
import Search from "../../assets/icons/search.svg";
import "./style.scss";

export type CustomInputProps = InputProps;
export type CustomInputNumber = InputNumberProps;

const CustomInput = (props: InputProps) => {
  return <Input {...props} />;
};

CustomInput.Password = ({ ...props }: CustomInputProps) => {
  return <Input.Password {...props} />;
};

CustomInput.Search = ({ className, ...props }: CustomInputProps) => {
  return <Input className={className} {...props} suffix={<Search />} />;
};

CustomInput.Number = ({ className, suffix, ...props }: CustomInputNumber) => {
  return <InputNumber className={className} suffix={suffix} {...props} />;
};

export default CustomInput;
