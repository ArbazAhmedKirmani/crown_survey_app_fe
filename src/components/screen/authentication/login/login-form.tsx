import { Checkbox, Form, Input } from "antd";
import CSFormItem from "../../../theme/atoms/cs-form-item";
import CSButton from "../../../theme/atoms/cs-button";
import useLogin from "./useLogin";
import { Link } from "react-router-dom";
import "./style.scss";

const LoginForm = () => {
  const [form] = Form.useForm();
  const { onLoginSubmit, loginSubmitoading } = useLogin();

  return (
    <Form
      form={form}
      onFinish={(data) => onLoginSubmit(data)}
      layout="vertical"
    >
      <CSFormItem
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
      </CSFormItem>
      <CSFormItem
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
      </CSFormItem>
      <div className="multi-fields">
        <CSFormItem name="remember_me" valuePropName="checked">
          <Checkbox>Remember Me</Checkbox>
        </CSFormItem>
        <Link
          className="ant-typography css-dev-only-do-not-override-1ygoi8g"
          to="forgot-password"
        >
          Forgot Password
        </Link>
      </div>
      <CSButton type="primary" htmlType="submit" loading={loginSubmitoading}>
        Login
      </CSButton>
    </Form>
  );
};

export default LoginForm;
