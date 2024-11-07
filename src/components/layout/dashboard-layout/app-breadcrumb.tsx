import { Breadcrumb } from "antd";
import { memo, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BreadcrumbNameMap } from "../../../utils/breadcrumb-name-map";
import { HomeOutlined } from "@ant-design/icons";

export interface IBreadcrumbNameMap {
  path: string;
  title: string;
}

const AppBreadcrumb = () => {
  const [pathList, setPathList] = useState<IBreadcrumbNameMap[]>([]);

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

export default memo(AppBreadcrumb);
