import { useMemo } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { type Todo } from '../types/todo.types';

interface TableComponentPropsTypes {
  isLoading: boolean;
  todos: Todo[];
}

const TableComponent = ({ todos, isLoading }: TableComponentPropsTypes) => {
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
              onClick={() => console.log('View', row.original)}
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
              color="warning"
              onClick={() => console.log('Edit', row.original)}
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
              onClick={() => console.log('Delete', row.original)}
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
    <Box
      component="div"
      sx={{
        width: '100%',
        maxWidth: 800,
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
  );
};

export default TableComponent;
