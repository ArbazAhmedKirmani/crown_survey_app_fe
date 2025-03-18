export const QUERY_STRING = {
  PAGINATION: {
    LIMIT: "_limit",
    PAGE: "_page",
    SEARCH: "_search",
  },
  OTHER_PARAMS: {
    JOB_ID: "jb_ids",
    CUSTOMER_NAME: "_cs_n",
    HEIGHT: "_fp_h",
    WIDTH: "_fp_w",
    STATUS: "_jb_sts",
    PARENT_FORM: "_pa_f",
    CHILD_FORM: "_ch_f",
    SELECTED_FIELD: "_sl_f",
    SELECTED_CATEGORY: "_sl_ct",
    SELECTED_REFERENCE: "_sl_rf",
    REFERENCE_NAME: "_rf_nm",
    FORM_FIELD_IDENTIFIER: "_f_F_id_f",
  },
  FILTERS: {
    DATE_FROM: "_dateFrom",
    DATE_TO: "_dateTo",
    REGION_ID: "_regionId",
    SERVICE_ID: "_serviceId",
    STATUSES: "_statuses",
    MARKET: "_market",
    SERVICE_PROVIDER: "_serviceProId",
    REDO: "_redo",
    RESCHEDULED: "_rescheduled",
    REFUNDED: "_refunded",
    SERVICE_PRO: "_servicePro",
    RATING: "_rating",
  },

  CALENDAR_MODE: "_calender_mode",
};

Object.seal(QUERY_STRING);
