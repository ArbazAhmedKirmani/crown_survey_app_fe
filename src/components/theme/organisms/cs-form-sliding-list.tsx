import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import useQueryString from "../../../hooks/use-query-string";

export interface ICSFormSlidingList {
  list?: { prefix: string; title: string; id: number }[];
  type: string;
}

const CSFormSlidingList = (props: ICSFormSlidingList) => {
  const { list, type } = props;
  const { getQuery, setQuery } = useQueryString();
  const [collapse, setCollapse] = useState<boolean>(false);

  const selectedItem = getQuery(type);

  const handleFormSelect = (id: number) => setQuery({ [type]: id.toString() });

  return (
    list?.length && (
      <div className={`cs-form-sliding-list ${collapse ? "collapsed" : ""}`}>
        <div className="menu-header">
          <MenuOutlined
            style={{ color: "black" }}
            onClick={() => setCollapse((prev) => !prev)}
          />
        </div>

        <ul className="menu-list">
          {list?.map((item) => (
            <li
              key={item.id}
              className={`${
                selectedItem[type] === item.id.toString() && "active-item"
              } menu-item`}
              onClick={() => handleFormSelect(item.id)}
            >
              <span className="menu-prefix">{item.prefix}</span>
              {!collapse && <span className="menu-text">{item.title}</span>}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default CSFormSlidingList;
