export const APP_CONSTANTS = {
  APP: { URL: import.meta.env.VITE_APP_BASE_URL },
  LOCAL_STORAGE: {
    IS_AUTHENTICATED: "b07163fe-06ea-46d2-947b-6a586618110c",
  },
  AUTH: {
    AUTH_TOKEN: "b07163fe-f4c4-43f9-b490-6dd7f87a89a1",
    REFRESH_TOKEN: "6e6e2861-81b7-4e28-b26b-f8eb2baa43fb",
    REMEMBER_ME: "2640995e-c3a5-474d-90c3-efda25b8c5e3",
    UUID: "5c88941a-12e1-4d06-a8d1-e615180765a3",
    USER_EMAIL: "7d2ecb3e-49b5-4a95-b44e-af809bdadd45",
    USER_OTP: "dc1f0e3d-06ea-46d2-947b-6a586618110c",
  },
  API: {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3002/",
  },
};

Object.seal(APP_CONSTANTS);
