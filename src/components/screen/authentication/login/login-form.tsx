import { Checkbox, Form, Input } from "antd";
import CustomFormItem from "../../../theme/custom-form-item";
import CustomButton from "../../../theme/custom-button";
import useLogin from "./useLogin";
import { Link } from "react-router-dom";
import "./style.scss";

const LoginForm = () => {
  const [form] = Form.useForm();
  const { onLoginSubmit } = useLogin();

  return (
    <Form
      form={form}
      onFinish={(data) => onLoginSubmit(data)}
      layout="vertical"
    >
      <CustomFormItem
        label="Email"
        name={"email"}
        rules={[
          {
            required: true,
            message: "Please enter email address",
          },
          {
            type: "email",
            message: "Please enter a valid email address",
            pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
          },
        ]}
      >
        <Input type="email" placeholder="Email" />
      </CustomFormItem>
      <CustomFormItem
        label="Password"
        name={"password"}
        rules={[
          {
            required: true,
            message: "Please enter password",
          },
        ]}
      >
        <Input type="password" placeholder="Password" />
      </CustomFormItem>
      <div className="multi-fields">
        <CustomFormItem name="remember_me" valuePropName="checked">
          <Checkbox>Remember Me</Checkbox>
        </CustomFormItem>
        <Link
          className="ant-typography css-dev-only-do-not-override-1ygoi8g"
          to="forgot-password"
        >
          Forgot Password
        </Link>
      </div>
      <CustomButton type="primary" htmlType="submit">
        Login
      </CustomButton>
    </Form>
  );
};

export default LoginForm;
