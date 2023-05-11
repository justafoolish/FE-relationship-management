export interface PaginationRequest {
  limit?: number;
  page?: number;
  type?: 'all';
  from_date?: string;
  to_date?: string;
}
