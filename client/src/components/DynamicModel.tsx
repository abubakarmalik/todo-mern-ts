import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import AddUserForm from './AddUserForm';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface DynamicModelPropsType {
  open: boolean;
  isForm: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DynamicModel({
  open,
  title,
  onClose,
  onConfirm,
  isForm = false,
}: DynamicModelPropsType) {
  return (
    <>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {isForm && <AddUserForm />}
          {!isForm && (
            <Typography gutterBottom>
              This action not be undo item will delete permanent
            </Typography>
          )}
        </DialogContent>
        {!isForm && (
          <DialogActions>
            <Button
              autoFocus
              variant="outlined"
              onClick={onConfirm}
              sx={{ px: { xs: 1.5, sm: 2.5 } }}
            >
              cancel
            </Button>
            <Button
              autoFocus
              variant="contained"
              onClick={onConfirm}
              sx={{ px: { xs: 1.5, sm: 2.5 } }}
            >
              Confirm
            </Button>
          </DialogActions>
        )}
      </BootstrapDialog>
    </>
  );
}
