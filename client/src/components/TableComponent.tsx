import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_PaginationState,
  type MRT_ColumnFiltersState,
} from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { type Todo } from '../types/todo.types';
import { useNavigate } from 'react-router-dom';
import DynamicModel from './DynamicModel';
import { useTodo } from '../hooks/useTodos';
import toast from 'react-hot-toast';
import debounce from 'debounce';

const TableComponent = () => {
  const navigate = useNavigate();
  const { fetchTodos, deleteTodo, todos, isLoading, total } = useTodo();
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState<Todo | null>(null);
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    [],
  );
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const debounceFetchTodos = useMemo(
    () =>
      debounce(
        (
          pageIndex: number,
          pageSize: number,
          filters?: {
            id: string;
            value: any;
          }[],
        ) => {
          const filter: Record<string, any> = {};

          filters?.forEach((ColFilter) => {
            if (!ColFilter?.id || ColFilter.value == null) return;

            if (ColFilter.value instanceof Date) {
              filter[ColFilter.id] = new Date(ColFilter.value).toISOString();
              return;
            }

            filter[ColFilter.id] = String(ColFilter.value);
          });

          fetchTodos(
            pageIndex + 1,
            pageSize,
            Object.keys(filter).length ? filter : undefined,
          );
        },
        500,
      ),
    [fetchTodos],
  );

  useEffect(() => {
    debounceFetchTodos(
      pagination.pageIndex,
      pagination.pageSize,
      columnFilters,
    );
    return () => {
      if (debounceFetchTodos.isPending) {
        debounceFetchTodos.clear();
      }
    };
  }, [pagination, columnFilters]);

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
      const { message } = await deleteTodo(selectedId);
      toast.success(message);
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
        accessorFn: (row) => new Date(row.createdAt || ''),
        id: 'createdAt',
        header: 'Created',
        filterVariant: 'date',
        size: 80,
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleString(),
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
          enableColumnFilters
          enableSorting={false}
          rowNumberDisplayMode="static"
          state={{ isLoading, pagination }}
          manualPagination={true}
          rowCount={total}
          onPaginationChange={setPagination}
          manualFiltering
          onColumnFiltersChange={setColumnFilters}
        />
      </Box>
      <DynamicModel
        title="Are you sure?"
        isForm={false}
        isLoading={isLoading || undefined}
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
