const Order = require('../models/Order');

const orderController = {};

orderController.getOrders = async (req,res) => {
    const orders = await Order.find();
    res.json(orders);
};

orderController.createOrder = async (req,res) => {
    const order = new Order(req.body);
    await order.save();
    res.json({status: 'Orden generada', _id: order._id });
};

orderController.getOrder= async (req,res) => {
    const order = await Order.findById(req.params.id);
    res.json(order);
};

orderController.editOrder = async (req,res) => {
    await Order.findOneAndUpdate({_id: req.params.id}, req.body);
    res.json({status: 'Orden actualizada', _id: order._id });
};

orderController.deleteOrder = async (req,res) => {
    await Order.findByIdAndRemove(req.params.id);
    res.json({status: 'Orden eliminada', _id: req.body._id });
};

module.exports = orderController;