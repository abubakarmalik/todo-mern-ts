import React, { createContext, useContext, useState } from 'react';
import type { Todo, CreateTodoDto, UpdateTodoDto } from '../types/todo.types';
import type { ApiResult, Paginated } from '../types/api.type';
import { todoService } from '../services/todos.service';

interface TodosContextValue {
  total: number;
  todos: Todo[];
  isLoading: boolean;
  fetchTodos: (
    page?: number,
    limit?: number,
    filters?: Record<string, any>,
  ) => Promise<ApiResult<Paginated<Todo> | Todo[]>>;
  createTodo: (payload: CreateTodoDto) => Promise<ApiResult<Todo>>;
  updateTodo: (id: string, payload: UpdateTodoDto) => Promise<ApiResult<Todo>>;
  deleteTodo: (id: string) => Promise<ApiResult<null>>;
}

const TodosContext = createContext<TodosContextValue | undefined>(undefined);

export const TodosProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchTodos = async (
    page?: number,
    limit?: number,
    filters?: Record<string, any>,
  ) => {
    setIsLoading(true);
    try {
      const res = filters
        ? await todoService.getAllTodosFiltered(page, limit, filters)
        : await todoService.getAllTodos(page, limit);
      if ((res.data as any).items) {
        setTodos((res.data as any).items);
        setTotal((res.data as any).total);
      } else {
        setTodos(res.data as Todo[]);
      }

      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const createTodo = async (payload: CreateTodoDto) => {
    setIsLoading(true);
    try {
      const res = await todoService.create(payload);
      setTodos((prev) => [...prev, res.data]);
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTodo = async (id: string, payload: UpdateTodoDto) => {
    setIsLoading(true);
    try {
      const res = await todoService.update(id, payload);
      setTodos((prev) => prev.map((t) => (t.id === id ? res.data : t)));
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await todoService.remove(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        isLoading,
        total,
        fetchTodos,
        createTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => {
  const ctx = useContext(TodosContext);
  if (!ctx)
    throw new Error('useTodosContext must be used within TodosProvider');
  return ctx;
};

export default TodosContext;
