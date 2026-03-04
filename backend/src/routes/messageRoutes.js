import express from 'express';
import { getConversation, getInbox } from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/',        getInbox);        // GET /api/messages        → inbox list
router.get('/:userId', getConversation); // GET /api/messages/:userId → chat history

export default router;