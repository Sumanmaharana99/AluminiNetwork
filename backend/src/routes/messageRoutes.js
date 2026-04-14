import express from 'express';
import { getConversation, getInbox } from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getInbox);
router.get('/:userId', getConversation);

export default router;