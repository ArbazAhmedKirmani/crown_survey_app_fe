import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Tooltip } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { useNavigate } from "react-router-dom";

interface ICSTableAction {
  id: number | string;
  record: AnyObject;
  handleEdit?: (id: number | string, record: AnyObject) => void;
  handleDelete?: (id: number | string, record: AnyObject) => void;
}

const CSTableAction = (props: ICSTableAction) => {
  const navigate = useNavigate();

  return (
    <div>
      <Tooltip rootClassName="cs-tooltip" placement="top" title="Edit">
        <span
          onClick={() =>
            props?.handleEdit
              ? props.handleEdit(props.id, props.record)
              : navigate(`${props.id}`)
          }
          style={{ cursor: "pointer", padding: 8, color: "#0876cb" }}
        >
          <EditFilled />
        </span>
      </Tooltip>
      {props?.handleDelete && (
        <Tooltip rootClassName="cs-tooltip" placement="top" title="Delete">
          <span
            onClick={() => props.handleDelete!(props.id, props.record)}
            style={{ cursor: "pointer", padding: 8, color: "#d91818" }}
          >
            <DeleteFilled />
          </span>
        </Tooltip>
      )}
    </div>
  );
};

export default CSTableAction;
