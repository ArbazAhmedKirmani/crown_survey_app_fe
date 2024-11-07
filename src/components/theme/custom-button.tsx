import { Button, ButtonProps } from "antd";
import "./style.scss";

export interface ICustomButtonProps extends ButtonProps {
  type?: "link" | "text" | "default" | "primary" | "dashed" | undefined;
}

const CustomButton = (props: ICustomButtonProps) => {
  return (
    <Button {...props} className={`custom-button ${props?.className}`}>
      {props.children}
    </Button>
  );
};

export default CustomButton;
