import { Select } from "antd";
import { SelectProps } from "antd/lib";

// export interface ICSSelect extends SelectProps {}

const CSSelect = (props: SelectProps) => {
  // const [defaultValue] = useState<number | string | null | undefined>(() =>
  //   props?.firstitem && !props?.value ? props.options?.[0].value : null
  // );

  return (
    <div className="cs-select">
      <Select {...props} />
    </div>
  );
};

export default CSSelect;
