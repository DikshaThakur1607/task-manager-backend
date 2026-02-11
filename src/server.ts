import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();

app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173', // Your React App URL
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Apply our routes
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.get('/health', (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Clean server flying at http://localhost:${PORT}`));