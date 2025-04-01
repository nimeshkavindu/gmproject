import express from 'express';
import * as productController from '../controllers/productController.js';
import { adminAuth } from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/add', adminAuth, upload.single('image'), productController.addProduct);
router.get('/list', productController.listProduct);
router.post('/remove', adminAuth, productController.removeProduct);

export default router;