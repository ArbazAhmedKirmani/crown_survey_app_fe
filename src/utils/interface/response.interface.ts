export interface IPaginatedApiResponse<T> {
  data: T;
  totalCount: number;
  itemsPerPage: number;
  pageNumber: number;
  message?: string;
}

export interface IApiResponse<T> {
  data: T;
  message?: string;
}

export interface IPaginatedQueryObject {
  _limit: number | string;
  _page: number | string;
  _search: number | string;
}
