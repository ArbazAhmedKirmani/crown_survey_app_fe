import { useRef, useState } from "react";
import CSFloorPlan from "../../theme/organisms/cs-floor-plan";
import CSButton from "../../theme/atoms/cs-button";
import { AnyObject } from "antd/es/_util/type";
import { Form, Modal, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import CSInput from "../../theme/atoms/cs-input";
import { getSqftDimensions } from "../../../utils/helper/general.helper";

const FloorPlan = () => {
  const [canvasForm] = useForm();
  const [modal, setModal] = useState<boolean>(false);
  const [canvas, setCanvas] = useState<{
    height: number;
    width: number;
  } | null>(null);
  const ref = useRef<{
    values: AnyObject[];
  }>();

  const handleModal = () => {
    if (modal) setCanvas(null);
    setModal((prev) => !prev);
  };

  return (
    <div className="floor-plan" style={{ width: "100%", height: "100%" }}>
      <CSButton onClick={handleModal}>New Floor Plan</CSButton>
      <Modal
        open={modal}
        destroyOnClose
        onCancel={handleModal}
        title={<Typography.Title level={4}>Floor Plan</Typography.Title>}
        footer={null}
        width={"auto"}
        centered
      >
        {!canvas ? (
          <Form
            form={canvasForm}
            layout="vertical"
            onFinish={(values: AnyObject) =>
              setCanvas((prev) => {
                const data = getSqftDimensions(values.area);
                return data;
              })
            }
          >
            <Form.Item label="name" name="name">
              <CSInput placeholder="Floor Plan Name" />
            </Form.Item>
            <Form.Item label="Area" name="area">
              <CSInput type="number" placeholder="Area" suffix="sq.ft" />
            </Form.Item>
            <Form.Item>
              <CSButton type="primary" htmlType="submit">
                Submit
              </CSButton>
            </Form.Item>
          </Form>
        ) : (
          <div>
            <CSFloorPlan
              ref={ref}
              height={canvas.height}
              width={canvas.width}
            />
            <CSButton
              onClick={() => console.log(ref.current?.values)}
              style={{ marginRight: 10 }}
            >
              Cancel
            </CSButton>
            <CSButton
              onClick={() => console.log(ref.current?.values)}
              type="primary"
            >
              Submit
            </CSButton>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FloorPlan;
