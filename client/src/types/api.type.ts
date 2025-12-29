export type ApiSuccess<T> = { success: true; message: string; data: T };
export type ApiError = { success: false; message: string; error: string };
export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export type ApiResult<T> = { data: T; message: string };

export type Paginated<T> = {
	items: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
};
