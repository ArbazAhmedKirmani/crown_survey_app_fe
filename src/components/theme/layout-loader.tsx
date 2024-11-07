import { Skeleton } from "antd";
import { PropsWithChildren } from "react";
import "./style.scss";

export type TLoaderType = "auth" | "dashboard";

export interface ILayoutLoader extends PropsWithChildren {
  type: TLoaderType;
}

const LayoutLoader = (props: ILayoutLoader) => {
  return (
    <div className="layout-loader">
      {/* <Skeleton.Node active={true} /> */}
      <Skeleton.Input
        active={true}
        size="small"
        className="stripe"
        style={{ width: props.type === "auth" ? 60 : 100 }}
      />
      <Skeleton.Input
        active={true}
        className="stripe"
        style={{ width: props.type === "auth" ? 90 : 140 }}
      />
      <Skeleton.Input
        active={true}
        size="large"
        className="stripe"
        style={{ width: props.type === "auth" ? 120 : 180 }}
      />
      {/* <Skeleton.Input active={true} className="stripe" /> */}
      <Skeleton active />
    </div>
  );
};

export default LayoutLoader;
