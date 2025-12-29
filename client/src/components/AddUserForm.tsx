import { Box, TextField, Button } from '@mui/material';
import type { CreateTodoDto, Todo, UpdateTodoDto } from '../types/todo.types';
import { toast } from 'react-hot-toast';
import { useTodo } from '../hooks/useTodos';
import { Formik } from 'formik';
import { todoValidationSchema } from '../schema/todoValidationSchema';

interface AddUserFormProps {
  onClose: () => void;
  isEdit?: Todo;
}

const AddUserForm = ({ onClose, isEdit }: AddUserFormProps) => {
  const { createTodo, updateTodo } = useTodo();

  const initialValues: CreateTodoDto | UpdateTodoDto = {
    name: isEdit ? isEdit.name : '',
    email: isEdit ? isEdit.email : '',
    age: isEdit ? isEdit.age : 0,
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={todoValidationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const payload: CreateTodoDto = {
            name: values.name || '',
            email: values.email || '',
            age: Number(values.age),
          };

          if (isEdit) {
            const { message } = await updateTodo(isEdit.id, payload);
            toast.success(message);
          } else {
            const { message } = await createTodo(payload);
            toast.success(message);
          }
          resetForm();
          onClose();
        } catch (err) {
          toast.error(err instanceof Error ? err.message : 'Failed to submit');
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 400,
            mx: 'auto',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            border: '1px solid #ccc',
            borderRadius: 2,
          }}
        >
          <TextField
            label="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name ? errors.name : ''}
            fullWidth
            sx={{ width: { xs: '100%', sm: 300, md: 400 } }}
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email ? errors.email : ''}
            fullWidth
          />
          <TextField
            label="Age"
            type="number"
            name="age"
            value={values.age === 0 ? '' : values.age}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.age && Boolean(errors.age)}
            helperText={touched.age && errors.age ? errors.age : ''}
            fullWidth
            sx={{
              '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
                {
                  display: 'none',
                  margin: 0,
                },
              '& input[type=number]': {
                MozAppearance: 'textfield',
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            sx={{
              '&.Mui-disabled': {
                backgroundColor: 'secondary.light',
                color: 'text.disabled',
              },
            }}
          >
            {isSubmitting ? 'Loading...' : isEdit ? 'Update User' : 'Add User'}
          </Button>
        </Box>
      )}
    </Formik>
  );
};

export default AddUserForm;
