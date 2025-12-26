import { useState, useEffect } from 'react';
import type { Todo, CreateTodoDto, UpdateTodoDto } from '../types/todo.types';
import { todoService } from '../services/todos.service';

export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // fetch todos
  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const response = await todoService.getAllTodos();
      setTodos(response);
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setIsLoading(false);
    }
  };
  // get todo by id
  const fetchTodoById = async (id: string) => {
    const selected = await todoService.getTodoById(id);
    setSelectedTodo(selected);
  };
  // create todo
  const createTodo = async (payload: CreateTodoDto) => {
    const newTodo = await todoService.create(payload);
    setTodos((prev) => [...prev, newTodo]);
  };
  // update todo
  const updateTodo = async (id: string, payload: UpdateTodoDto) => {
    const updated = await todoService.update(id, payload);
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };
  // delete todo
  const deleteTodo = async (id: string) => {
    await todoService.remove(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    selectedTodo,
    isLoading,
    createTodo,
    fetchTodoById,
    updateTodo,
    deleteTodo,
  };
};
