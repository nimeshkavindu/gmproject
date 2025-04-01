// backend/controllers/productController.js
import { Product } from '../config/db.js';

export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file ? req.file.filename : null;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      image,
    });

    return res.json({ success: true, message: 'Product added successfully', product });
  } catch (error) {
    return res.json({ success: false, message: 'Error adding product' });
  }
};

export const listProduct = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.json({ success: true, data: products });
  } catch (error) {
    return res.json({ success: false, message: 'Error fetching products' });
  }
};

export const removeProduct = async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.body.id } });
    return res.json({ success: true, message: 'Product removed successfully' });
  } catch (error) {
    return res.json({ success: false, message: 'Error removing product' });
  }
};