export const API_ROUTES = {
  auth: {
    login: "auth/login",
    refresh: "/auth/refresh-token",
  },
  templates: {
    get: "api/schema",
  },
  jobs: {
    get: "api/jobs",
    getForms: "api/jobs/forms",
    getSectionByForm: (id?: string) => `api/jobs/forms/${id}`,
    getFieldsBySection: (id?: string) => `api/jobs/section/${id}`,
    getFieldsDetail: (id?: string) => `api/jobs/field/${id}`,
    // post: "api/form",
    // put: (id: string) => `api/form/${id}`,
  },
  reference: {
    get: "api/reference",
    getCategory: "api/reference/category",
    getCategoryById: (id?: string) => `api/reference/category/${id}`,
    getReferenceByCategory: (id?: string) => `api/reference/${id}/category`,
    post: `api/reference`,
    postCategory: `api/reference/category`,
    // getFieldsBySection: (id?: string) => `api/reference/section/${id}`,
  },
  form: {
    get: "api/form",
    getById: (id?: string) => `api/form/${id}`,
    post: "api/form",
    put: (id: string) => `api/form/${id}`,
    delete: `api/form`,
  },
  attachment: {
    post: "api/upload",
    put: (id: string) => `api/upload/${id}`,
    delete: (id: string) => `api/upload/${id}`,
  },
};

Object.seal(API_ROUTES);
