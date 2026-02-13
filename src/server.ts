import * as express from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

const app: express.Application = express.default ? express.default() : express();

app.use(helmet());
app.use(cors.default ? cors.default() : cors());
app.use(express.json());

// Ensure your routes are imported correctly below
// app.use('/users', userRoutes);
// app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});