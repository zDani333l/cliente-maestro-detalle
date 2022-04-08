export interface IPagination {
  CurrentPage: number;
  TotalPages: number;
  PageSize: number;
  TotalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
