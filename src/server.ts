import * as express from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

const app = (express as any).default ? (express as any).default() : express();

app.use(helmet());
const corsOptions = (cors as any).default ? (cors as any).default() : cors();
app.use(corsOptions);
app.use(express.json());

// Ensure your routes are imported correctly below
// app.use('/users', userRoutes);
// app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});