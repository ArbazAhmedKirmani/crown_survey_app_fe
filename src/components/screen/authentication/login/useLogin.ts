import { useNavigate } from "react-router-dom";
import usePostApi from "../../../../hooks/use-post-api";
import { API_ROUTES } from "../../../../utils/constants/api-routes.constant";
import { APP_CONSTANTS } from "../../../../utils/constants/app.constant";
import { IApiResponse } from "../../../../utils/interface/response.interface";

export interface ILoginData {
  email: string;
  password: string;
}

export interface ILoginResponse {
  email: string;
  token: string;
  name: string;
}

export interface IUseLogin {
  onLoginSubmit: (data: ILoginData) => void;
}

const useLogin = () => {
  const navigate = useNavigate();

  const { mutate, isPending: loginSubmitoading } = usePostApi<
    ILoginData,
    ILoginResponse
  >({
    url: API_ROUTES.auth.login,
    onSuccess: (data: IApiResponse<ILoginResponse>) => {
      if (data?.data?.token) {
        localStorage.setItem(APP_CONSTANTS.AUTH.AUTH_TOKEN, data?.data?.token);
        navigate("/");
      }
    },
  });

  const onLoginSubmit = (data: ILoginData) => {
    mutate(data);
  };

  return { onLoginSubmit, loginSubmitoading };
};

export default useLogin;
