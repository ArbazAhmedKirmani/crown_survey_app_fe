import { Breadcrumb } from "antd";
import { memo, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import BreadcrumbNameMap from "../../../utils/constants/breadcrumb-name-map.constant";

export interface ICSBreadcrumbNameMap {
  path: string;
  title: string;
}

const CSAppBreadcrumb = () => {
  const [pathList, setPathList] = useState<ICSBreadcrumbNameMap[]>([]);

  const location = useLocation();

  useEffect(() => {
    const pathSnippets = location.pathname.split("/").filter((i) => i);

    setPathList(
      pathSnippets?.map((_, index) => {
        const url: keyof typeof BreadcrumbNameMap = `/${pathSnippets
          .slice(0, index + 1)
          .join("/")}` as keyof typeof BreadcrumbNameMap;

        return {
          path: url,
          title: BreadcrumbNameMap[url],
        };
      })
    );
  }, [location.pathname]);

  return (
    <Breadcrumb
      className="cs-breadcrumb"
      itemRender={(route) => {
        return <Link to={route.path!}>{route.title}</Link>;
      }}
      items={[
        {
          path: "/",
          title: <HomeOutlined />,
        },
        ...pathList,
      ]}
    />
  );
};

export default memo(CSAppBreadcrumb);
