export interface IPagination<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalPage: number;
  totalItem: number;
  // cursor paging
  next?: string;
  hashNext?: boolean;
  previous?: string;
  hashPrevious?: boolean;
}

export interface IPaginationParams {
  /**
   * @field page
   * @type number
   * @description set current page
   * @example 1
   */
  page?: number;
  /**
   * @field pageSize
   * @type number
   * @description size page request.
   * @example 20
   */
  pageSize?: number;
  /**
   * @field sortOrder
   * @type string
   * @description sort order param asc | desc
   * @example asc
   */
  sortOrder?: 'asc' | 'desc';
  /**
   * @field sortBy
   * @type string
   * @description field sort
   * @example name
   */
  sortBy?: string;
}

export interface ISearchPaginationParams extends IPaginationParams {
  /**
   * @field search
   * @type string
   * @description full text search
   * @example hello world
   */
  search?: string;
}
