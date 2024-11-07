import { create } from "zustand";

export interface IAuthStore {
  authenticated: false;
  setAuthenticationUser?: () => void;
  unauthenticateUser?: () => void;
}

type ISet = (partial: unknown, replace?: false) => void;

const setAuthenticationUser = (set: ISet, state: Partial<IAuthStore>) => {
  set({ ...state });
};

const AuthStore = create((set: ISet) => ({
  authenticated: false,
  setAuthentication: (state: Partial<IAuthStore>) =>
    setAuthenticationUser(set, state),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (state: Partial<IAuthStore>) => set({ ...state }),
}));

export default AuthStore;
