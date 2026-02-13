import express = require('express'); 
import cors = require('cors');       
import * as dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

// Fix: Now that we use 'import = require', we call them directly
const app = express(); 

app.use(helmet());

// Fix: Simplified cors call
app.use(cors());

app.use(express.json());

// Ensure these are uncommented if you have your routes ready:
// import { router as userRoutes } from './routes/userRoutes';
// import { router as taskRoutes } from './routes/taskRoutes';
// app.use('/users', userRoutes);
// app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});