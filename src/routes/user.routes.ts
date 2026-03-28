import { Router } from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.use(protect); // all routes below require login

router.get('/',             getAllUsers);
router.get('/:userId',      getUserById);
router.put('/:userId',      updateUser);
router.delete('/:userId',   deleteUser);

export default router;