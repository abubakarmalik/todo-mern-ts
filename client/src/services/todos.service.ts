import { http } from '../api/http';
import { unwrap } from '../api/unwrap';
import type { ApiResponse, Paginated } from '../types/api.type';
import type { Todo, CreateTodoDto, UpdateTodoDto } from '../types/todo.types';

export const todoService = {
  getAllTodos: async (page?: number, limit?: number) => {
    const { data } = await http.get<ApiResponse<Paginated<Todo> | Todo[]>>(
      '/users',
      { params: { page, limit } },
    );
    return unwrap(data);
  },

  getTodoById: async (id: string) => {
    const { data } = await http.get<ApiResponse<Todo>>(`/users/${id}`);
    return unwrap(data);
  },

  create: async (payload: CreateTodoDto) => {
    const { data } = await http.post<ApiResponse<Todo>>('/users', payload);
    return unwrap(data);
  },

  update: async (id: string, payload: UpdateTodoDto) => {
    const { data } = await http.patch<ApiResponse<Todo>>(
      `/users/${id}`,
      payload,
    );
    return unwrap(data);
  },

  remove: async (id: string) => {
    const { data } = await http.delete<ApiResponse<null>>(`/users/${id}`);
    return unwrap(data);
  },
};
