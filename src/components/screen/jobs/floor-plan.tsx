// import { useRef, useState } from "react";
// import CSFloorPlan from "../../theme/organisms/cs-floor-plan";
// import CSButton from "../../theme/atoms/cs-button";
// import { AnyObject } from "antd/es/_util/type";
// import { Form, Modal, Typography } from "antd";
// import { useForm } from "antd/es/form/Form";
// import CSInput from "../../theme/atoms/cs-input";
// import { getSqftDimensions } from "../../../utils/helper/general.helper";
// import fabric from "fabric";
import { Form, Modal, Space } from "antd";
import useQueryString from "../../../hooks/use-query-string";
import CSCanvas from "../../theme/molecules/cs-canvas";
import CSInput from "../../theme/atoms/cs-input";
import CSButton from "../../theme/atoms/cs-button";
import { QUERY_STRING } from "../../../utils/constants/query.constant";
import { useForm } from "antd/es/form/Form";
import CSFormItem from "../../theme/atoms/cs-form-item";
import { isNull, isUndefined } from "lodash";

const FloorPlan = () => {
  const [form] = useForm();
  const { getQuery, setQuery } = useQueryString();

  const query: any = getQuery([
    QUERY_STRING.OTHER_PARAMS.HEIGHT,
    QUERY_STRING.OTHER_PARAMS.WIDTH,
  ]);
  // const canvasRef = useRef<fabric.Canvas | null>(null);
  // const [modal, setModal] = useState<boolean>(false);
  // const [canvas, setCanvas] = useState<{
  //   height: number;
  //   width: number;
  // } | null>(null);

  // const handleModal = () => {
  //   if (modal) setCanvas(null);
  //   setModal((prev) => !prev);
  // };

  // const saveDrawing = () => {
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;

  //   // Get canvas state as JSON
  //   const canvasState = canvas.toJSON();
  //   localStorage.setItem("savedCanvas", JSON.stringify(canvasState));
  // };

  // const loadDrawing = () => {
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;

  //   // Get saved canvas data from localStorage
  //   const savedCanvas = localStorage.getItem("savedCanvas");
  //   if (savedCanvas) {
  //     const parsedCanvasData = JSON.parse(savedCanvas);

  //     // Load canvas state
  //     canvas.loadFromJSON(parsedCanvasData, canvas.renderAll.bind(canvas));
  //   }
  // };

  return (
    <div>
      <CSCanvas
        height={+query?.[QUERY_STRING.OTHER_PARAMS.HEIGHT]}
        width={+query?.[QUERY_STRING.OTHER_PARAMS.WIDTH]}
      />
      <Modal
        open={!query?.[QUERY_STRING.OTHER_PARAMS.HEIGHT]}
        closable={false}
        centered
        footer={null}
      >
        <Form
          form={form}
          onFinish={(val) => {
            setQuery({
              [QUERY_STRING.OTHER_PARAMS.HEIGHT]: val.height,
              [QUERY_STRING.OTHER_PARAMS.WIDTH]: val.width,
            });
          }}
        >
          <Space>
            <CSFormItem name="width" rules={[{ required: true, message: "" }]}>
              <CSInput placeholder="Width (Meter)" />
            </CSFormItem>
            <CSFormItem name="height" rules={[{ required: true, message: "" }]}>
              <CSInput placeholder="Length (Meter)" />
            </CSFormItem>
            <CSFormItem>
              <CSButton type="primary" htmlType="submit">
                Confirm
              </CSButton>
            </CSFormItem>
          </Space>
        </Form>
      </Modal>
    </div>
    // <div className="floor-plan" style={{ width: "100%", height: "100%" }}>
    //   <CSButton onClick={handleModal}>New Floor Plan</CSButton>
    //   <Modal
    //     open={modal}
    //     destroyOnClose
    //     onCancel={handleModal}
    //     title={<Typography.Title level={4}>Floor Plan</Typography.Title>}
    //     footer={null}
    //     width={"auto"}
    //     centered
    //     style={{ width: "95vw", height: "95vh", overflow: "scroll" }}
    //   >
    //     {!canvas ? (
    //       <Form
    //         form={canvasForm}
    //         layout="vertical"
    //         onFinish={(values: AnyObject) =>
    //           setCanvas(() => {
    //             const data = getSqftDimensions(values.area);
    //             return data;
    //           })
    //         }
    //       >
    //         <Form.Item label="name" name="name">
    //           <CSInput placeholder="Floor Plan Name" />
    //         </Form.Item>
    //         <Form.Item label="Area" name="area">
    //           <CSInput type="number" placeholder="Area" suffix="sq.ft" />
    //         </Form.Item>
    //         <Form.Item>
    //           <CSButton type="primary" htmlType="submit">
    //             Submit
    //           </CSButton>
    //         </Form.Item>
    //       </Form>
    //     ) : (
    //       <div>
    //         <CSFloorPlan
    //           ref={canvasRef}
    //           height={canvas.height}
    //           width={canvas.width}
    //         />
    //         <CSButton
    //           onClick={() => console.log(canvasRef.current?.getObjects())}
    //           style={{ marginRight: 10 }}
    //         >
    //           Cancel
    //         </CSButton>
    //         <CSButton
    //           onClick={() => console.log(canvasRef.current?.getObjects())}
    //           type="primary"
    //         >
    //           Submit
    //         </CSButton>
    //       </div>
    //     )}
    //   </Modal>
    // </div>
  );
};

export default FloorPlan;
