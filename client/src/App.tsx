import { RouterProvider } from 'react-router-dom';
import { router } from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
