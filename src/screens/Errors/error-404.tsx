import { Result } from "antd";
import CustomButton from "../../components/theme/custom-button";
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
        <CustomButton type="primary" onClick={goBack}>
          Back Home
        </CustomButton>
      }
      icon={<NotFound />}
    />
  );
};

export default Error404;
