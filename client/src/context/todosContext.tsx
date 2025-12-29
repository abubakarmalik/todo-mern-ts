import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Todo, CreateTodoDto, UpdateTodoDto } from '../types/todo.types';
import type { ApiResult } from '../types/api.type';
import { todoService } from '../services/todos.service';

interface TodosContextValue {
  todos: Todo[];
  isLoading: boolean;
  fetchTodos: () => Promise<ApiResult<Todo[]>>;
  createTodo: (payload: CreateTodoDto) => Promise<ApiResult<Todo>>;
  updateTodo: (id: string, payload: UpdateTodoDto) => Promise<ApiResult<Todo>>;
  deleteTodo: (id: string) => Promise<ApiResult<null>>;
}

const TodosContext = createContext<TodosContextValue | undefined>(undefined);

export const TodosProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const res = await todoService.getAllTodos();
      setTodos(res.data);
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

  useEffect(() => {
    void fetchTodos();
  }, []);

  return (
    <TodosContext.Provider
      value={{
        todos,
        isLoading,
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
