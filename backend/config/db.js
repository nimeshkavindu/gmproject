import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
import userModel from '../models/userModel.js';
import productModel from '../models/productModel.js';
import cartModel from '../models/cartModel.js';
import orderModel from '../models/orderModel.js';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

const User = userModel(sequelize, DataTypes);
const Product = productModel(sequelize, DataTypes);
const Cart = cartModel(sequelize, DataTypes);
const Order = orderModel(sequelize, DataTypes);

export { sequelize, User, Product, Cart, Order };
