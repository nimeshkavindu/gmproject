// backend/routes/orderRoute.js
import express from 'express';
import { adminAuth } from '../middleware/auth.js';
import * as orderController from '../controllers/orderController.js';

const router = express.Router();

router.post('/place', orderController.placeOrder);
router.get('/list', adminAuth, orderController.listOrders);
router.post('/status', adminAuth, orderController.updateStatus);
router.post('/userorders', orderController.userOrders);
router.post('/verify', orderController.verifyOrder);

export default router;