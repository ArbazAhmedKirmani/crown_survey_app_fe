import { Button, Typography } from "antd";
import useJobs from "./useJobs";

const Jobs = () => {
  const { handleCreateNewJob, handleFloorPlan } = useJobs();

  return (
    <div>
      <Typography.Title level={1}>JOBS</Typography.Title>
      <Button type="primary" onClick={handleCreateNewJob}>
        Create New Jobs
      </Button>
      <Button type="primary" onClick={handleFloorPlan}>
        Create New Floor Plan
      </Button>
    </div>
  );
};

export default Jobs;
