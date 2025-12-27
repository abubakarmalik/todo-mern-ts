import { RouterProvider } from 'react-router-dom';
import { router } from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { TodosProvider } from './context/todosContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <TodosProvider>
        <RouterProvider router={router} />
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
