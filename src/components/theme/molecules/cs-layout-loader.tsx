import { Skeleton } from "antd";
import { PropsWithChildren } from "react";

export type TLoaderType = "auth" | "dashboard";

export interface ICSLayoutLoader extends PropsWithChildren {
  type: TLoaderType;
}

const CSLayoutLoader = (props: ICSLayoutLoader) => {
  return (
    <div className="cs-layout-loader">
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
      <Skeleton active />
    </div>
  );
};

export default CSLayoutLoader;
