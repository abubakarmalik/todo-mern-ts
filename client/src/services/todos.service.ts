import { http } from '../api/http';
import type { Todo, CreateTodoDto, UpdateTodoDto } from '../types/todo.types';

export const todoService = {
  getAllTodos: async (): Promise<Todo[]> => {
    const { data } = await http.get('/users');
    if (!data.success) {
      throw new Error(data.message);
    }
    return data.data;
  },
  getTodoById: async (id: string): Promise<Todo> => {
    const { data } = await http.get(`/users/${id}`);
    if (!data.success) {
      throw new Error(data.message);
    }
    return data.data;
  },
  create: async (payload: CreateTodoDto): Promise<Todo> => {
    const { data } = await http.post('/users', payload);
    if (!data.success) {
      throw new Error(data.message);
    }
    return data;
  },

  update: async (id: string, payload: UpdateTodoDto): Promise<Todo> => {
    const { data } = await http.patch(`/users/${id}`, payload);
    if (!data.success) {
      throw new Error(data.message);
    }
    return data;
  },

  remove: async (id: string): Promise<void> => {
    const { data } = await http.delete(`/users/${id}`);
    if (!data.success) {
      throw new Error(data.message);
    }
    return data;
  },
};
