import { MenuOutlined } from "@ant-design/icons";
import { ReactNode, useEffect, useState } from "react";
import useQueryString from "../../../hooks/use-query-string";
import { Spin } from "antd";

export type TCSFormSlidingListProp = {
  prefix?: string;
  name: string;
  id: number | string;
  mapperName?: string;
  JobFields?: { id: string }[];
};

export interface ICSFormSlidingList {
  list?: TCSFormSlidingListProp[];
  type: string;
  loading?: boolean;
  title?: string;
  onSelect?: (item: TCSFormSlidingListProp) => void;
  width?: number;
  height?: string | number;
  hidePrefix?: boolean;
  showCustomRender?: (item: TCSFormSlidingListProp) => ReactNode;
}

const CSFormSlidingList = (props: ICSFormSlidingList) => {
  const {
    list,
    type,
    // title,
    width = 50,
  } = props;
  const { getQuery, setQuery } = useQueryString();
  const [collapse, setCollapse] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>(
    () => getQuery(type) as string
  );

  const handleFormSelect = (item: TCSFormSlidingListProp) => {
    setQuery({ [type]: item.id.toString() });
    setSelectedItem(item.id.toString());
    if (props?.onSelect) props?.onSelect(item);
  };

  useEffect(() => {
    if (window.innerWidth <= 900) {
      setCollapse(true);
    }
  }, []);

  return (
    <Spin spinning={props?.loading}>
      {!!list?.length && (
        <div
          id="cs-form-sliding-list"
          className={`cs-form-sliding-list${collapse ? " collapsed" : ""}`}
        >
          <div className="menu-header">
            <MenuOutlined
              style={{ color: "black" }}
              onClick={() => setCollapse((prev) => !prev)}
            />
          </div>

          <ul
            className="menu-list"
            style={{
              ...(collapse && { width: width }),
              height: props?.height ?? "Calc(100vh - 16rem)",
            }}
          >
            {list?.map((item: TCSFormSlidingListProp, index: number) => (
              <li
                key={item.id + index.toString()}
                className={`${
                  selectedItem === item.id.toString()
                    ? "active-item"
                    : undefined
                } menu-item`}
                onClick={() => handleFormSelect(item)}
              >
                {!props?.hidePrefix && Boolean(item?.prefix) && (
                  <span className="menu-prefix">{item?.prefix}</span>
                )}
                {props?.showCustomRender && (
                  <span className="menu-prefix">
                    {props.showCustomRender(item)}
                  </span>
                )}
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
