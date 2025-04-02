import express from 'express';
import * as productController from '../controllers/productController.js';
import { auth } from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/add', auth, upload.single('image'), productController.addProduct);
router.get('/list', productController.listProduct);
router.post('/remove', auth, productController.removeProduct);

export default router;