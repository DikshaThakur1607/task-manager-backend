import { Router } from 'express';
import { createTask, getMyTasks, updateTask, deleteTask } from '../controllers/taskController';
import { authenticateToken } from '../middleware/auth';
// --- ADD THESE TWO IMPORTS ---
import { validate } from '../middleware/validate';
import { createTaskSchema } from '../schemas/taskSchema';

const router = Router();

// This protects ALL routes below it, so you don't have to repeat it
router.use(authenticateToken);

// 1. Auth (from router.use) -> 2. Validate -> 3. Controller
router.post('/', validate(createTaskSchema), createTask);

router.get('/', getMyTasks);
router.patch('/:id', updateTask); 
router.delete('/:id', deleteTask);

export default router;