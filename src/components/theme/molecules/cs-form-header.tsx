import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CSFormHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="cs-form-header">
      <span onClick={() => navigate(-1)}>
        <ArrowLeftOutlined />
      </span>
    </div>
  );
};

export default CSFormHeader;
