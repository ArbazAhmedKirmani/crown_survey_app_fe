import { Result } from "antd";
import CSButton from "../../components/theme/atoms/cs-button";
import { useNavigate } from "react-router-dom";
import NotFound from "../../assets/icons/page-not-found";

const Error404 = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <CSButton type="primary" onClick={goBack}>
          Back Home
        </CSButton>
      }
      icon={<NotFound />}
    />
  );
};

export default Error404;
