import TableComponent from '../components/TableComponent';
import { useTodo } from '../hooks/useTodos';

const HomePage = () => {
  const { todos, isLoading } = useTodo();
  return <TableComponent todos={todos} isLoading={isLoading} />;
};

export default HomePage;
