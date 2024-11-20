import { create } from "zustand";

export interface IAuthStore {
  authenticated: false;
  setAuthenticationUser?: () => void;
  unauthenticateUser?: () => void;
}

type ISet = (partial: unknown, replace?: false) => void;

const setJobData = (set: ISet, state: Partial<IAuthStore>) => {
  set({ ...state });
};

const JobStore = create((set: ISet) => ({
  job: {},
  setJob: (state: Partial<IAuthStore>) => setJobData(set, state),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (state: Partial<IAuthStore>) => set({ ...state }),
}));

export default JobStore;
