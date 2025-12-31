const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');
const authMiddleware = require('../middleware/auth');

// Create new order (protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    // Generate unique orderId
    const orderId = 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
    const order = new Order({
      user: req.user._id,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      paymentMethod: req.body.paymentMethod,
      orderId
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all orders for logged-in user (protected)
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get order details by orderId (protected)
router.get('/:orderId', authMiddleware, async (req, res) => {
  try {
    console.log('Order details request:', {
      orderId: req.params.orderId,
      userId: req.user._id
    });
    const order = await Order.findOne({ orderId: req.params.orderId, user: req.user._id }).populate('items.product');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
