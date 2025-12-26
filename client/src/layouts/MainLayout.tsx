import { Outlet } from 'react-router-dom';
import Topbar from '../components/Topbar';
import { Box, Container } from '@mui/material';

const MainLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {/* Topbar (fixed) */}
      <Topbar />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: '64px',
          pb: 2,
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Container maxWidth="md">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
