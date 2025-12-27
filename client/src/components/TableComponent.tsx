import { useMemo, useState } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { type Todo } from '../types/todo.types';
import { useNavigate } from 'react-router-dom';
import DynamicModel from './DynamicModel';
import { useTodo } from '../hooks/useTodos';
import toast from 'react-hot-toast';

interface TableComponentPropsTypes {
  isLoading: boolean;
  todos: Todo[];
}

const TableComponent = ({ todos, isLoading }: TableComponentPropsTypes) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState<Todo | null>(null);
  const { deleteTodo } = useTodo();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnClickView = (row: Todo) => {
    navigate(`/users/${row.id}`);
  };

  const handleOnClickEdit = (row: Todo) => {
    setIsEdit(row);
    setOpenEdit(true);
  };
  const handleOnClickDelete = (row: Todo) => {
    setSelectedId(row.id);
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteTodo(selectedId);
      toast.success('User deleted');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete');
    } finally {
      setSelectedId(null);
      setOpen(false);
    }
  };

  const columns = useMemo<MRT_ColumnDef<Todo>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 200,
      },
      {
        accessorKey: 'age',
        header: 'Age',
        size: 100,
      },
      {
        id: 'view',
        header: 'View',
        size: 80,
        Cell: ({ row }) => (
          <Tooltip title="View">
            <IconButton
              color="primary"
              onClick={() => handleOnClickView(row.original)}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        ),
      },
      {
        id: 'edit',
        header: 'Edit',
        size: 80,
        Cell: ({ row }) => (
          <Tooltip title="Edit">
            <IconButton
              color="info"
              onClick={() => handleOnClickEdit(row.original)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        ),
      },
      {
        id: 'delete',
        header: 'Delete',
        size: 80,
        Cell: ({ row }) => (
          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={() => handleOnClickDelete(row.original)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <Box
        component="div"
        sx={{
          width: '100%',
          p: { xs: 2, sm: 3 },
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <MaterialReactTable
          columns={columns}
          data={isLoading ? [] : todos}
          enableRowNumbers
          enableColumnFilters={false}
          enableSorting={false}
          rowNumberDisplayMode="static"
          state={{ isLoading }}
        />
      </Box>
      <DynamicModel
        title="Are you sure?"
        isForm={false}
        open={open}
        onClose={() => {
          setSelectedId(null);
          handleClose();
        }}
        onConfirm={handleConfirmDelete}
      />

      <DynamicModel
        title="Update User"
        isForm={true}
        open={openEdit}
        isEdit={isEdit || undefined}
        onClose={() => {
          setSelectedId(null);
          setOpenEdit(false);
        }}
        onConfirm={() => {}}
      />
    </>
  );
};

export default TableComponent;
