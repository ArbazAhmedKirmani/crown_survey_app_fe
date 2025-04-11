export const API_ROUTES = {
  auth: {
    login: "auth/login",
    refresh: "/auth/refresh-token",
  },
  templates: {
    get: "api/schema",
  },
  customer: {
    get: `api/customer`,
  },
  jobs: {
    get: "api/jobs",
    getPreview: (id: String) => `api/jobs/preview/${id}`,
    getById: (id: string) => `api/jobs/${id}`,
    status: (id?: string) => `api/jobs/${id}/status`,
    post: "api/jobs",
    detail: (id: string) => `api/jobs/detail/${id}`,
    getForms: "api/jobs/forms",
    getSectionByForm: (id?: string) => `api/jobs/forms/${id}`,
    getFieldsBySection: (id?: string, jobId?: string) =>
      `api/jobs/section/${id}/${jobId}`,
    getFieldsDetail: (id?: string) => `api/jobs/field/${id}`,
    getJobFields: (id?: string, jobId?: string) =>
      `api/jobs/detail/${id}/job/${jobId}`,
    generateForm: (id?: string) => `api/jobs/${id}/generate-form`,
    getAllFields: `api/jobs/fields/lookup`,
    getFieldByForm: (id: string) => `api/jobs/fields/form/${id}`,
    sectionFields: (id: string) => `api/jobs/section-fields/${id}`,
  },
  reference: {
    get: "api/reference",
    getById: (id: string) => `api/reference/${id}`,
    getCategory: "api/reference/category",
    getCategoryById: (id?: string) => `api/reference/category/${id}`,
    getReferenceByCategory: (id?: string) => `api/reference/${id}/category`,
    post: `api/reference`,
    put: (id: string) => `api/reference/${id}`,
    postCategory: `api/reference/category`,
    deleteCategory: (id: string) => `api/reference/category/${id}`,
    categoryWithReference: (id: string) =>
      `api/reference/category-reference/${id}`,
    // getFieldsBySection: (id?: string) => `api/reference/section/${id}`,
  },
  form: {
    get: "api/form",
    getById: (id?: string) => `api/form/${id}`,
    post: "api/form",
    put: (id: string) => `api/form/${id}`,
    delete: (id: string) => `api/form/${id}`,
  },
  attachment: {
    post: "api/upload",
    put: (id: string) => `api/upload/${id}`,
    delete: (id: string) => `api/upload/${id}`,
  },
  users: {
    get: "api/user",
  },
  report: {
    pendingJobs: "api/report/all/job/pending",
    monthlyCompletedJobs: "api/report/monthly/job/completed",
  },
  formFieldReference: {
    get: (id: string) => `api/form-field/${id}`,
    post: "api/form-field",
  },
};

Object.seal(API_ROUTES);
