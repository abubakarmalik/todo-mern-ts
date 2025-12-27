import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import type { CreateTodoDto, Todo } from '../types/todo.types';
import { toast } from 'react-hot-toast';
import { useTodo } from '../hooks/useTodos';

interface AddUserFormProps {
  onClose: () => void;
  isEdit?: Todo;
}

const AddUserForm = ({ onClose, isEdit }: AddUserFormProps) => {
  const { createTodo, updateTodo } = useTodo();
  const [formData, setFormData] = useState<CreateTodoDto>({
    name: '',
    email: '',
    age: 0,
  });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.age) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      if (isEdit) {
        await updateTodo(isEdit.id, formData);
        toast.success('User Updated');
      } else {
        await createTodo(formData);
        toast.success('User added');
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to add user');
    } finally {
      onClose();
      setFormData({ name: '', email: '', age: 0 });
    }
  };
  useEffect(() => {
    if (isEdit) {
      setFormData({
        name: isEdit.name,
        email: isEdit.email,
        age: isEdit.age,
      });
    }
  }, [isEdit]);

  return (
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
        value={formData.name}
        onChange={handleOnChange}
        fullWidth
        sx={{ width: { xs: '100%', sm: 300, md: 400 } }}
      />
      <TextField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleOnChange}
        fullWidth
      />
      <TextField
        label="Age"
        type="number"
        name="age"
        value={formData.age === 0 ? '' : formData.age}
        onChange={handleOnChange}
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
      <Button type="submit" variant="contained" color="primary">
        {isEdit ? 'Update User' : 'Add User'}
      </Button>
    </Box>
  );
};

export default AddUserForm;
