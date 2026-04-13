import express from 'express';
import {
  getAllAlumni,
  getAllStudents,
  getUserById,
  updateProfile,
  getAllUsers,
  toggleUserStatus,
  deleteUser,
} from '../controllers/userController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/alumni',            getAllAlumni);
router.get('/students',          getAllStudents);
router.put('/profile',           updateProfile);

// Admin only
router.get('/',                  restrictTo('admin'), getAllUsers);
router.put('/:id/toggle-status', restrictTo('admin'), toggleUserStatus);
router.delete('/:id',            restrictTo('admin'), deleteUser);

// Dynamic ID route must be LAST to avoid shadowing named routes
router.get('/:id',               getUserById);

export default router;