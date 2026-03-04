import express from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/',       getEvents);
router.get('/:id',    getEventById);
router.post('/',      restrictTo('alumni', 'admin'), createEvent);
router.put('/:id',    updateEvent);
router.delete('/:id', deleteEvent);

export default router;