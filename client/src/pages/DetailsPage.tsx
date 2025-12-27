import { Box } from '@mui/material';
import TodoDetails from '../components/TodoDetails';

const DetailsPage = () => {
  return (
    <Box
      component="div"
      sx={{
        p: { xs: 2, sm: 3 },
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <TodoDetails />
    </Box>
  );
};

export default DetailsPage;
