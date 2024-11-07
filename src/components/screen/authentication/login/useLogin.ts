import { useNavigate } from "react-router-dom";
import { CONSTANTS } from "../../../../utils/constants";

export interface ILoginData {
  email: string;
  password: string;
}

export interface IUseLogin {
  onLoginSubmit: (data: ILoginData) => void;
}

const useLogin = () => {
  const navigate = useNavigate();
  const onLoginSubmit = (data: ILoginData) => {
    console.log(data);
    localStorage.setItem(CONSTANTS.LOCAL_STORAGE.IS_AUTHENTICATED, data.email);
    navigate("/");
  };

  return { onLoginSubmit };
};

export default useLogin;
