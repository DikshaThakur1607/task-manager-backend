import { Router } from 'express';
import { signup, login, getUsers } from '../controllers/userController';
import { validate } from '../middleware/validate';
import { signupSchema } from '../schemas/userSchema';

const router = Router();

// Apply the bouncer here
router.post('/signup', validate(signupSchema), signup);

router.post('/login', login);
router.get('/', getUsers);

export default router;