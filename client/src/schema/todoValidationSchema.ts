import * as Yup from 'yup';

export const todoValidationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .max(30, 'Name must be at most 30 characters'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required')
    .max(30, 'Email must be at most 30 characters'),
  age: Yup.number()
    .required('Age is required')
    .typeError('Age must be a number')
    .positive('Age must be greater than 0')
    .max(100, 'Age must be at most 100'),
});
