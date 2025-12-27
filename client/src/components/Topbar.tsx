import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useState } from 'react';
import DynamicModel from './DynamicModel';

export default function Topbar() {
  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <DashboardIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontSize: { xs: 16, sm: 18, md: 20, lg: 22 } }}
          >
            Todos App
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<PersonAddAltIcon />}
            sx={{ fontSize: { xs: 12, sm: 14 }, px: { xs: 1.5, sm: 2.5 } }}
            onClick={handleClickOpen}
          >
            Add User
          </Button>
        </Toolbar>
      </AppBar>
      <DynamicModel
        open={open}
        isForm={true}
        onClose={handleClose}
        title="Add User"
        onConfirm={handleClose}
      />
    </Box>
  );
}
