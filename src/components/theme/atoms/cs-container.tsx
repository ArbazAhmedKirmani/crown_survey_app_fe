import { PropsWithChildren } from "react";

const CSContainer = ({ children }: PropsWithChildren) => {
  return <div className="cs-container">{children}</div>;
};

export default CSContainer;
