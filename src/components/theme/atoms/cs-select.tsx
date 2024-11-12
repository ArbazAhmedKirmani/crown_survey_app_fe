import { Select } from "antd";
import { SelectProps } from "antd/lib";

const CSSelect = (props: SelectProps) => {
  return (
    <div className="cs-select">
      <Select {...props} />
    </div>
  );
};

export default CSSelect;
