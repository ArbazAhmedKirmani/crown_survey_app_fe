import { Button, Typography } from "antd";
import useJobs from "./useJobs";

const Jobs = () => {
  const { handleCreateNewJob } = useJobs();

  return (
    <div>
      <Typography.Title level={1}>JOBS</Typography.Title>
      <Button type="primary" onClick={handleCreateNewJob}>
        Create New Jobs
      </Button>
    </div>
  );
};

export default Jobs;
