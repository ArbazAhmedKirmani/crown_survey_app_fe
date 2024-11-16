import { Button, Modal, Typography } from "antd";
import useJobs from "./useJobs";
import { useState } from "react";

const Jobs = () => {
  const [fpOpen, setFcOpen] = useState<boolean>();
  const { handleCreateNewJob, handleFloorPlan } = useJobs();

  const toggleFcModal = () => {
    setFcOpen((prev) => !prev);
  };

  return (
    <div>
      <Typography.Title level={1}>JOBS</Typography.Title>
      <Button type="primary" onClick={handleCreateNewJob}>
        Create New Jobs
      </Button>
      <Button type="primary" onClick={handleFloorPlan}>
        Create New Floor Plan
      </Button>
      <Modal footer={null} open={fpOpen} onClose={toggleFcModal}></Modal>
    </div>
  );
};

export default Jobs;
