import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import helmet from 'helmet';

// Ensure you use .js extensions for these imports!
import { router as userRoutes } from './routes/userRoutes.js';
import { router as taskRoutes } from './routes/taskRoutes.js';

dotenv.config();
const app = express();

app.use(helmet());

// 1. Updated CORS: This is the "Bouncer" that will let your local app in
app.use(cors({
  origin: '*', 
  credentials: true
}));

app.use(express.json());

// 2. Health Check: Adding this so the /api/health URL actually works
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is reachable!' });
});

// 3. Routes: Make sure these match your frontend URLs
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});