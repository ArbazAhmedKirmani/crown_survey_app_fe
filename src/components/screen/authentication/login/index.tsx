import { Divider } from "antd";
import LoginForm from "./login-form";
import { Link } from "react-router-dom";
import "./style.scss";

const Login = () => {
  return (
    <div className="login-form">
      <div className="intro">
        <h1 className="heading">Login</h1>
        <p className="description">Proceed with your provided credentials</p>
      </div>
      <LoginForm />
      <div className="custom-divider">
        <Divider plain>
          Don't have an Account?&nbsp;
          <Link
            className="ant-typography css-dev-only-do-not-override-1ygoi8g"
            to="request-credentials"
          >
            Request Credentials
          </Link>
        </Divider>
      </div>
    </div>
  );
};

export default Login;
