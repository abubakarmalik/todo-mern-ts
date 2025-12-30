export interface Todo {
  id: string;
  name: string;
  email: string;
  age: number;
  createdAt?: string;
}

export type CreateTodoDto = Omit<Todo, 'id'>;
export type UpdateTodoDto = Partial<CreateTodoDto>;
