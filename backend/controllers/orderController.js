const { Order, Product } = require('../config/database');

const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId; 

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
    });

    return res.json({ success: true, message: 'Order placed successfully' });
  } catch (error) {
    return res.json({ success: false, message: 'Error placing order' });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    return res.json({ success: true, data: orders });
  } catch (error) {
    return res.json({ success: false, message: 'Error fetching orders' });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // Validate status
    const validStatuses = ['Processing', 'Shipped', 'Delivered'];
    if (!validStatuses.includes(status)) {
      return res.json({ success: false, message: 'Invalid status' });
    }

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.json({ success: false, message: 'Order not found' });
    }

    await order.update({ status });
    return res.json({ success: true, message: 'Status updated successfully' });
  } catch (error) {
    return res.json({ success: false, message: 'Error updating status' });
  }
};

const userOrders = async (req, res) => {
  try {
    const userId = req.userId; 
    const orders = await Order.findAll({ where: { userId } });
    return res.json({ success: true, data: orders });
  } catch (error) {
    return res.json({ success: false, message: 'Error fetching user orders' });
  }
};

const verifyOrder = async (req, res) => {
  try {
    const { orderId, success } = req.body;
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.json({ success: false, message: 'Order not found' });
    }

    await order.update({ payment: success });
    return res.json({ success: true, message: 'Payment verified' });
  } catch (error) {
    return res.json({ success: false, message: 'Error verifying payment' });
  }
};

module.exports = { placeOrder, listOrders, updateStatus, userOrders, verifyOrder };