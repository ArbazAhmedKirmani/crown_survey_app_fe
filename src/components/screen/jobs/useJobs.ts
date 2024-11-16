import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useJobs = () => {
  const navigate = useNavigate();
  const [firstCollapse, setFirstCollapse] = useState(false);
  const [secondCollapse, setSecondCollapse] = useState(false);

  const handleCreateNewJob = () => {
    navigate("new");
  };

  const handleFloorPlan = () => {
    navigate("floor/floor-plan");
  };

  const handleCollapse = (collapseNumber: 1 | 2) => {
    if (collapseNumber === 1) {
      setFirstCollapse((prev) => !prev);
    }
    if (collapseNumber === 2) {
      setSecondCollapse((prev) => !prev);
    }
  };

  return {
    handleCreateNewJob,
    firstCollapse,
    secondCollapse,
    handleCollapse,
    handleFloorPlan,
  };
};

export default useJobs;
