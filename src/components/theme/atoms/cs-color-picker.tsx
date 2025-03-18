import { ColorPicker } from "antd";
import { ColorPickerProps } from "antd";

export interface ICSColorPicker extends ColorPickerProps {}

const CSColorPicker = (props: ICSColorPicker) => {
  return (
    <ColorPicker
      {...props}
      onChangeComplete={(color) => {
        props?.onChange?.(color, color.toCssString());
      }}
    />
  );
};

export default CSColorPicker;
