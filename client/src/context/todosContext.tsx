import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Todo, CreateTodoDto, UpdateTodoDto } from '../types/todo.types';
import { todoService } from '../services/todos.service';

interface TodosContextValue {
  todos: Todo[];
  isLoading: boolean;
  fetchTodos: () => Promise<Todo[]>;
  createTodo: (payload: CreateTodoDto) => Promise<Todo>;
  updateTodo: (id: string, payload: UpdateTodoDto) => Promise<Todo>;
  deleteTodo: (id: string) => Promise<void>;
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
      const { data } = await todoService.getAllTodos();
      setTodos(data);
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  const createTodo = async (payload: CreateTodoDto) => {
    const { data } = await todoService.create(payload);
    setTodos((prev) => [...prev, data]);
    return data;
  };

  const updateTodo = async (id: string, payload: UpdateTodoDto) => {
    const { data } = await todoService.update(id, payload);
    setTodos((prev) => prev.map((t) => (t.id === id ? data : t)));
    return data;
  };

  const deleteTodo = async (id: string) => {
    await todoService.remove(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
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
