export interface ApiResponseModel<T> {
  status: string,
  statusText: string,
  statusCode: number,
  message: string,
  data?: T,
  errors?: string[],
}

export interface PaginatedApiResponseModel<T> {
  "data": PaginatedData<T>,
  "status": string,
  "statusText": string,
  "statusCode": number,
  "message": string
}

interface PaginatedData<T> {
  "pageIndex": number,
  "pageSize": number,
  "count": number,
  "data": T
}
