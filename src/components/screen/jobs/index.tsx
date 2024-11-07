import { Button } from "antd";
import useJobs from "./useJobs";

const Jobs = () => {
  const { handleCreateNewJob } = useJobs();

  return (
    <div>
      <h1>JOBS</h1>
      <Button type="primary" onClick={handleCreateNewJob}>
        Create New Jobs
      </Button>
    </div>
  );
};

export default Jobs;
