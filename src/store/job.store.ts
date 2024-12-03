import { create } from "zustand";

interface IJobStore {
  job: Record<string, any>;
}

type ISet = (
  partial: Partial<IJobStore> | ((state: IJobStore) => Partial<IJobStore>)
) => void;

const setJobData = (set: ISet, state: Partial<IJobStore>) => {
  set((prevState) => ({
    job: {
      ...prevState.job,
      ...(state || {}),
    },
  }));
};

const removeJobData = (set: ISet, state: Partial<IJobStore>) => {
  set((prevState) => {
    const updatedJob = { ...prevState.job };
    Object.keys(state.job || {}).forEach((key) => {
      delete updatedJob[key];
    });
    return { job: updatedJob };
  });
};

// Zustand store
const useJobStore = create<
  IJobStore & {
    setJob: (state: Partial<IJobStore>) => void;
    removeJob: (state: Partial<IJobStore>) => void;
  }
>((set) => ({
  job: {},
  setJob: (state: Partial<IJobStore>) => setJobData(set, state),
  removeJob: (state: Partial<IJobStore>) => removeJobData(set, state),
}));

export default useJobStore;
