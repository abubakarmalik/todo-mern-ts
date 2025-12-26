import express, { Application, Request, Response } from 'express';
import userRoutes from './routes/user.routes';
import cors from 'cors';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to CRUD API',
    endpoints: {
      users: '/api/users',
    },
  });
});

app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
