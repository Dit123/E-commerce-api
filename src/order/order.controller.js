import { createOrderSchema } from "../validator/auth.js";
import { createOrder, getOrderById, updateOrderStatus, deleteOrderById  } from "./order.service.js";

export const createOrderController = async (req, res) => {
    try {
        const {error, value } = createOrderSchema.validate(req.body);

        if (error){
            return res.status(400).json({ error: error.details[0].message});
        }

        const {email, itemName, amount} = value;

        if (!email || !itemName || !amount ) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const orderId = await createOrder(email, itemName, amount);
        res.status(201).json({ message: 'Order created successfully', orderId });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error creating order' });
    }
};

export const getOrderByIdController = async (req, res) => {
    //console.log('Fetching order with ID:', req.params.orderId);

    try {
        const order = await getOrderById(req.params.orderId);
        if (!order ) {
            return res.status(404).json({ message: 'Order not found' });
        } else {
            res.status(200).json(order);
        }
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Error fetching order' });
    }
};


export const updateOrderStatusController = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const status  = req.params.status;
        await updateOrderStatus(orderId, status);
        res.status(200).json({ message: 'Order status updated successfully' });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Error updating order status' });
    }
};

export const deleteOrderByIdController = async (req, res) => {
    try {
        const { orderId } = req.params;
        await deleteOrderById(orderId);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Error deleting order' });
    }
};