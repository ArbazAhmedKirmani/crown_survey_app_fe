export const API_ROUTES = {
  auth: {
    login: "auth/login",
    refresh: "/auth/refresh-token",
  },
  templates: {
    get: "api/schema",
  },
  form: {
    get: "api/form",
    post: "api/form",
  },
  attachment: {
    post: "api/upload",
    put: (id: string) => `api/upload/${id}`,
  },
};

Object.seal(API_ROUTES);
