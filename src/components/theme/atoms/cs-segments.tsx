import { Segmented, SegmentedProps } from "antd";

interface ICSSegmented extends SegmentedProps {
  useQuery?: boolean;
}

const CSSegmented = (props: ICSSegmented) => {
  return <Segmented className="cs-segmented" {...props} />;
};

export default CSSegmented;
