import type { ApiResponse, ApiResult } from '../types/api.type';

export function unwrap<T>(res: ApiResponse<T>): ApiResult<T> {
  if (!res.success) throw new Error(res.message);
  return { data: res.data, message: res.message };
}
