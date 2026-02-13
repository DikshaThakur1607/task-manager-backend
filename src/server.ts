import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import helmet from 'helmet';

// Important: Import your routes here so they are active!
import { router as userRoutes } from './routes/userRoutes.js';
import { router as taskRoutes } from './routes/taskRoutes.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({
  origin: '*',                                     //['http://localhost:5173', 'http://127.0.0.1:5173'], 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('🚀 Task Manager API is running and healthy!');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is reachable!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});