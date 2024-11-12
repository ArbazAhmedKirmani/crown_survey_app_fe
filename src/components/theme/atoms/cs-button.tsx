import { Button, ButtonProps } from "antd";
import "./style.scss";

export interface ICSButtonProps extends ButtonProps {
  type?: "link" | "text" | "default" | "primary" | "dashed" | undefined;
}

const CSButton = (props: ICSButtonProps) => {
  return (
    <Button {...props} className={`cs-button ${props?.className}`}>
      {props.children}
    </Button>
  );
};

export default CSButton;
