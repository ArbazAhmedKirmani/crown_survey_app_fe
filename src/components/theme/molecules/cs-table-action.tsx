import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Popconfirm, Tooltip } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ICSTableAction {
  id: number | string;
  record: AnyObject;
  handleEdit?: (id: number | string, record: AnyObject) => void;
  handleDelete?: (id: number | string, record: AnyObject) => void;
  customUpdate?: ReactNode;
}

const CSTableAction = (props: ICSTableAction) => {
  const navigate = useNavigate();

  return (
    <div>
      <Tooltip rootClassName="cs-tooltip" placement="top" title="Edit">
        {props?.customUpdate ? (
          props.customUpdate
        ) : (
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
        )}
      </Tooltip>
      {props?.handleDelete && (
        <Tooltip rootClassName="cs-tooltip" placement="top" title="Delete">
          <Popconfirm
            title="Are you sure you want to delete this record?"
            arrow
            okText="Delete"
            okType="primary"
            onConfirm={() => props.handleDelete!(props.id, props.record)}
          >
            <span style={{ cursor: "pointer", padding: 8, color: "#d91818" }}>
              <DeleteFilled />
            </span>
          </Popconfirm>
        </Tooltip>
      )}
    </div>
  );
};

export default CSTableAction;
