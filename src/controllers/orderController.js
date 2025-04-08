const Order = require('../models/Order');

const orderController = {
  // Create new order
  async createOrder(req, res) {
    try {
      const { userId, items } = req.body;

      if (!userId || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Invalid order data. Please provide userId and items array.'
        });
      }

      const order = new Order({
        userId,
        items,
        totalAmount: items.reduce((total, item) => total + (item.quantity * item.price), 0)
      });

      await order.save();

      res.status(201).json({
        success: true,
        data: order
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating order',
        error: error.message
      });
    }
  },

  // Get all orders
  async getAllOrders(req, res) {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        data: orders
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching orders',
        error: error.message
      });
    }
  },

  // Get single order
  async getOrderById(req, res) {
    try {
      const order = await Order.findById(req.params.id);
      
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      res.status(200).json({
        success: true,
        data: order
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching order',
        error: error.message
      });
    }
  },

  // Update order
  async updateOrder(req, res) {
    try {
      const { status, items } = req.body;
      const orderId = req.params.id;

      const order = await Order.findById(orderId);
      
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      if (status) {
        order.status = status;
      }

      if (items) {
        order.items = items;
        order.totalAmount = items.reduce((total, item) => total + (item.quantity * item.price), 0);
      }

      await order.save();

      res.status(200).json({
        success: true,
        data: order
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating order',
        error: error.message
      });
    }
  },

  // Delete order
  async deleteOrder(req, res) {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      
      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Order deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting order',
        error: error.message
      });
    }
  }
};

module.exports = orderController;