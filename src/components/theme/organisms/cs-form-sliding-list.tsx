import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import useQueryString from "../../../hooks/use-query-string";
import { Spin } from "antd";

export type TCSFormSlidingListProp = {
  prefix: string;
  name: string;
  id: number | string;
};

export interface ICSFormSlidingList {
  list?: TCSFormSlidingListProp[];
  type: string;
  loading?: boolean;
  onSelect?: (item: TCSFormSlidingListProp) => void;
}

const CSFormSlidingList = (props: ICSFormSlidingList) => {
  const { list, type } = props;
  const { getQuery, setQuery } = useQueryString();
  const [collapse, setCollapse] = useState<boolean>(false);

  const selectedItem = getQuery(type);

  const handleFormSelect = (item: TCSFormSlidingListProp) => {
    setQuery({ [type]: item.id.toString() });
    if (props.onSelect) props?.onSelect(item);
  };

  return (
    <Spin spinning={props?.loading}>
      {list?.length && (
        <div className={`cs-form-sliding-list ${collapse ? "collapsed" : ""}`}>
          <div className="menu-header">
            <MenuOutlined
              style={{ color: "black" }}
              onClick={() => setCollapse((prev) => !prev)}
            />
          </div>

          <ul className="menu-list">
            {list?.map((item: TCSFormSlidingListProp) => (
              <li
                key={item.id}
                className={`${
                  selectedItem === item.id.toString() && "active-item"
                } menu-item`}
                onClick={() => handleFormSelect(item)}
              >
                <span className="menu-prefix">{item.prefix}</span>
                {!collapse && <span className="menu-text">{item.name}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Spin>
  );
};

export default CSFormSlidingList;
