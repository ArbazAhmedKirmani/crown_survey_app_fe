export const QUERY_STRING = {
  PAGINATION: {
    LIMIT: "_limit",
    PAGE: "_page",
    SEARCH: "_search",
  },
  TEMPLATE: { STATUS: "_temp_status" },
  OTHER_PARAMS: {
    PARENT_FORM: "_pa_f",
    CHILD_FORM: "_ch_f",
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
