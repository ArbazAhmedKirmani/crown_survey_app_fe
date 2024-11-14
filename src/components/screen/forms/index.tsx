import { EditFilled } from "@ant-design/icons";
import { AnyObject } from "antd/es/_util/type";
import CSTableForm from "../../theme/organisms/cs-table-view";
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../../../utils/constants/api-routes.constant";

const Forms = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Form Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Prefix",
      dataIndex: "prefix",
      key: "prefix",
    },
    {
      title: "Actions",
      dataIndex: "name",
      key: "name",
      width: 120,
      render: (_: string, record: AnyObject) => (
        <span onClick={() => navigate(`${record.id}`)} style={{ padding: 5 }}>
          <EditFilled />
        </span>
      ),
    },
  ];

  return (
    <CSTableForm
      columns={columns}
      newBtnTitle="New Form"
      url={API_ROUTES.form.get}
    />
  );
};

export default Forms;
