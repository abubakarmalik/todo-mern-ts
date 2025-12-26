import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const AddUserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || age === '') {
      alert('Please fill all fields');
      return;
    }

    setName('');
    setEmail('');
    setAge('');
  };

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
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        sx={{ width: { xs: '100%', sm: 300, md: 400 } }}
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Add User
      </Button>
    </Box>
  );
};

export default AddUserForm;
