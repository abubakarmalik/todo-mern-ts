export type ServiceResult<T> = {
  success: boolean;
  message: string;
  data: T;
  error: T;
};
