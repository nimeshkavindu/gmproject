module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      items: { type: DataTypes.JSON, allowNull: false },
      amount: { type: DataTypes.FLOAT, allowNull: false },
      address: { type: DataTypes.JSON, allowNull: false },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'Processing',
        validate: {
          isIn: [['Processing', 'Shipped', 'Delivered']],
        },
      },
      date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      payment: { type: DataTypes.BOOLEAN, defaultValue: false },
    });
    return Order;
  };