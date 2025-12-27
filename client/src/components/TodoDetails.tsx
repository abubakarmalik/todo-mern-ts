import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import user from '../assets/user.png';
import Typography from '@mui/material/Typography';
import { todoService } from '../services/todos.service';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Todo } from '../types/todo.types';
import toast from 'react-hot-toast';
import { Skeleton } from '@mui/material';

export default function TodoDetails() {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;

    (async () => {
      setLoading(true);
      try {
        const { data } = await todoService.getTodoById(id);
        setTodo(data);
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Failed');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading)
    <Skeleton sx={{}} variant="rectangular" width={400} height={100} />;
  if (!todo) return <Box>No user found</Box>;

  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {todo?.name}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            {todo?.email}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            Age: {todo?.age}
          </Typography>
        </CardContent>
      </Box>
      <CardMedia component="img" sx={{ width: 151 }} image={user} alt="user" />
    </Card>
  );
}
