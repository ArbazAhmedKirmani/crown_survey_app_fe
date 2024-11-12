import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  GenericAbortSignal,
  AxiosError,
} from "axios";
// import localForage from 'localforage';
import { AxiosMethodEnum, HttpStatusEnum } from "../utils/enum/general.enum";
import { APP_CONSTANTS } from "../utils/constants/app.constant";
import { createDynamicUrl } from "../utils/helper/general.helper";

// localForage.config({
//   driver: localForage.INDEXEDDB, // Force WebSQL; same as using setDriver()
//   name: APP_CONFIG.app.name,
//   version: 1.0,
//   storeName: 'keyvaluepairs', // Should be alphanumeric, with underscores.
//   description: 'indexed-db',
// });

export default class HTTP {
  static instance: AxiosInstance;
  token = "";

  constructor(abortSignal?: GenericAbortSignal) {
    if (!HTTP.instance) {
      HTTP.instance = axios.create({
        baseURL: APP_CONSTANTS.API.BASE_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
          "ngrok-skip-browser-warning": true,
        },
        signal: abortSignal,
      }); // Create a new instance of axios
    }
  }

  async refreshInstance() {
    const token = localStorage.getItem(APP_CONSTANTS.AUTH.AUTH_TOKEN);

    HTTP.instance = axios.create({
      baseURL: APP_CONSTANTS.API.BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": true,
      },
    });
  }

  applyInterceptors<T, D>() {
    HTTP.instance.interceptors.request.use(async (config) => {
      const local_token = localStorage.getItem(APP_CONSTANTS.AUTH.AUTH_TOKEN);
      if (local_token) {
        config.headers["authorization"] = `Bearer ${local_token}`;
      }
      return config;
    });
    HTTP.instance.interceptors.response.use(
      (response: AxiosResponse<{ [key: string]: T }, { [key: string]: D }>) => {
        return response;
      },
      async (error: AxiosError) => {
        const { status, config } = error?.response ?? error;

        /** UnAuthorized Route Access User Control Handler */
        // if (status === HttpStatusEnum.FORBIDDEN) {
        //   deleteCookie(STORAGE_KEYS.AUTH_TOKEN);
        //   deleteCookie(STORAGE_KEYS.REFRESH_TOKEN);
        //   deleteLocalStorage(STORAGE_KEYS.USER);
        //   window.location.reload();
        //   return false;
        // }

        const original_request = config;

        /** UnAuthorized User Handler */

        if (
          status === HttpStatusEnum.UNAUTHORIZED &&
          original_request &&
          !original_request.url?.includes("login")
        ) {
          /** Define property for limit loop */
          Object.defineProperty(original_request, "_retry", {
            value: true,
            writable: true,
            enumerable: true,
            configurable: true,
          });

          localStorage.removeItem(APP_CONSTANTS.AUTH.AUTH_TOKEN);
          document.location.reload();

          //   const local_refreshToken = await localForage.getItem(
          //     STORAGE_KEYS.AUTH.REFRESH_TOKEN
          //   );
          //   const local_accessToken = await localForage.getItem(
          //     STORAGE_KEYS.AUTH.AUTH_TOKEN
          //   );
          //   /** fetching a GET request for refresh token BUT you can use POST */
          //   const refresh_response = await fetch(
          //     APP_CONFIG.api.baseUrl + API_ROUTES.auth.refresh,
          //     {
          //       method: "POST",
          //       headers: {
          //         Authorization: "Bearer " + local_accessToken,
          //       },
          //       body: JSON.stringify({ refreshToken: local_refreshToken }),
          //     }
          //   );
          //   if (refresh_response.status === HttpStatusEnum.OK) {
          //     const { accessToken, refreshToken } = await refresh_response.json();
          //     /** setting up new tokens */
          //     await localForage.setItem(
          //       STORAGE_KEYS.AUTH.AUTH_TOKEN,
          //       accessToken
          //     );
          //     await localForage.setItem(
          //       STORAGE_KEYS.AUTH.REFRESH_TOKEN,
          //       refreshToken
          //     );
          //     this.refreshInstance();
          //     original_request.headers["authorization"] = `Bearer ${accessToken}`;
          //     const original_request_response = await HTTP.instance(
          //       original_request
          //     );
          //     return original_request_response;
          //   } else {
          //     await localForage.removeItem(STORAGE_KEYS.AUTH.AUTH_TOKEN);
          //     await localForage.removeItem(STORAGE_KEYS.AUTH.REFRESH_TOKEN);
          //     window.location.href = `/`;
          //   }

          //   ========================================================================================================

          // try {
          //   const refresh_response = await axios<
          //     { refreshToken: string },
          //     {
          //       data: { accessToken: string; refreshToken: string };
          //       status: number;
          //     }
          //   >({
          //     url: APP_CONFIG.api.baseUrl + API_ROUTES.auth.refresh,
          //     data: { refreshToken: local_refreshToken },
          //     method: 'POST',
          //     headers: {
          //       Authorization: 'Bearer ' + local_accessToken,
          //     },
          //   });
          //   const { accessToken, refreshToken } = refresh_response.data;

          //   /** setting up new tokens */
          //   await localForage.setItem(
          //     STORAGE_KEYS.AUTH.AUTH_TOKEN,
          //     accessToken
          //   );
          //   await localForage.setItem(
          //     STORAGE_KEYS.AUTH.REFRESH_TOKEN,
          //     refreshToken
          //   );
          //   this.refreshInstance();
          //   original_request.headers['authorization'] = `Bearer ${accessToken}`;

          //   const original_request_response =
          //     await HTTP.instance(original_request);

          //   return original_request_response;
          // } catch (error) {
          //   await localForage.removeItem(STORAGE_KEYS.AUTH.AUTH_TOKEN);
          //   await localForage.removeItem(STORAGE_KEYS.AUTH.REFRESH_TOKEN);
          //   //TODO: empty user from localforage and zustand
          //   // deleteLocalStorage(STORAGE_KEYS.USER);
          //   window.location.href = `/`;
          // }

          /** UnAuthorized Error Handling */
          // if (refresh_response.status === HttpStatusEnum.UNAUTHORIZED) {

          // }

          // if (!refresh_response) return error;

          //   setToken(AccessToken);
          //   setCookie(STORAGE_KEYS.AUTH_TOKEN, AccessToken);
          //   setCookie(STORAGE_KEYS.REFRESH_TOKEN, RefreshToken);
        }

        return error;
      }
    );
  }

  async call<T, R>({
    url,
    method = AxiosMethodEnum.GET,
    body,
    config,
    query,
  }: {
    url: string;
    method?: AxiosMethodEnum;
    body?: T;
    config?: AxiosRequestConfig;
    query?: Record<string, unknown>;
  }): Promise<AxiosResponse<R, T>> {
    let _url: string = url;
    if (query) _url = createDynamicUrl(url, query);
    this.applyInterceptors();
    return await HTTP.instance[method](
      _url,
      method === AxiosMethodEnum.GET ? config : body,
      config
    );
  }
}
