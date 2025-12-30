import { RouterProvider } from 'react-router-dom';
import { router } from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { TodosProvider } from './context/todosContext';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TodosProvider>
          <RouterProvider router={router} />
        </TodosProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
