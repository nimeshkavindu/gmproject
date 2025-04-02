import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./userModel.js"; 
import Product from "./productModel.js"; 

const Cart = sequelize.define("Cart", {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  userId: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: 'Users', // Match the User model name
      key: 'id'
    }
  },
  productId: {  // Renamed from itemId
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  },
  quantity: { 
    type: DataTypes.INTEGER, 
    defaultValue: 1 
  },
});

// Associations
Cart.associate = (models) => {
  Cart.belongsTo(models.User, { foreignKey: 'userId' });
  Cart.belongsTo(models.Product, { foreignKey: 'productId' }); // Link to Product
};

export default Cart;