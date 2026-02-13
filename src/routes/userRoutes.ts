import * as express from 'express'; // Required to fix the 'express is not defined' error
import { signup, login, getUsers } from '../controllers/userController.js';
//import { validate } from '../middleware/validate';
//import { signupSchema } from '../schemas/userSchema';

// 1. Fixed duplicate: Removed the 'const router = Router()' line
// 2. Added explicit type to satisfy the Render compiler
export const router: express.Router = express.Router();

// Apply the validation and controller here
router.post('/signup', signup);
router.post('/login', login);
