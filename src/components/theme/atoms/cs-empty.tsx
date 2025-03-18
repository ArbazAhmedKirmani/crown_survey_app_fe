import { EmptyProps } from "antd";

const CSEmpty = (props: EmptyProps) => {
  return (
    <div>
      <CSEmpty rootClassName="cs-empty" {...props} />;
    </div>
  );
};

export default CSEmpty;
