import { useTodosContext } from '../context/todosContext';

export const useTodo = () => {
  return useTodosContext();
};

export default useTodo;
