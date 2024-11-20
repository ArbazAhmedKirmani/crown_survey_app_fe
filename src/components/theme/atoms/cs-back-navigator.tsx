import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CSBackNavigator = () => {
  const navigate = useNavigate();
  return (
    <div className="cs-back-navigator">
      <span onClick={() => navigate(-1)}>
        <ArrowLeftOutlined />
      </span>
    </div>
  );
};

export default CSBackNavigator;
