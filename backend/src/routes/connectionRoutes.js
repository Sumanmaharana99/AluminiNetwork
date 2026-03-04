import express from 'express';
import {
  sendRequest,
  acceptRequest,
  rejectRequest,
  getPendingRequests,
  getMyConnections,
} from '../controllers/connectionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/',                       getMyConnections);
router.get('/pending',                getPendingRequests);
router.post('/request/:userId',       sendRequest);
router.put('/accept/:connectionId',   acceptRequest);
router.put('/reject/:connectionId',   rejectRequest);

export default router;