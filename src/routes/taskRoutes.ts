import * as express from 'express'; // Use * as syntax for better compatibility
import { createTask, getMyTasks, updateTask, deleteTask } from '../controllers/taskController.js';
import { authenticateToken } from '../middleware/auth.js';
//import { validate } from '../middleware/validate';
//import { createTaskSchema } from '../schemas/taskSchema';

// Explicitly define the type to fix the "Inferred type cannot be named" error
export const router: express.Router = express.Router();

// This protects ALL routes below it
router.use(authenticateToken);
// 1. Auth (from router.use) -> 2. Validate -> 3. Controller
router.post('/', createTask);
router.get('/', getMyTasks);
router.patch('/:id', updateTask); 
router.delete('/:id', deleteTask);