import { Select } from "antd";
import { SelectProps } from "antd/lib";
import { PropsWithChildren } from "react";

export interface ICSSelect extends SelectProps, PropsWithChildren {}

const CSSelect = (props: ICSSelect) => {
  return (
    <div className="cs-select">
      <Select {...props} />
    </div>
  );
};

export default CSSelect;
