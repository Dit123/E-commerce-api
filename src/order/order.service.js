import { executeQuery } from "../config.js/database.js";

export const createOrder = async (email, itemName, amount) => {
    try {
        const query = `
            INSERT INTO orders (email, itemName, amount)
            VALUES (?, ?, ?)
        `;
        const values = [email, itemName, amount];
        const result = await executeQuery(query, values);
        return result.insertId;
    } catch (error) {
        console.log('Error creating order', error);
        
    }
};


export const getOrderById = async (orderId) => {
    try {
        const query = `SELECT * FROM orders WHERE orderId = ?`;
        const result = await executeQuery(query, [orderId]);

        //console.log('Query result:', result);
        if (result.length > 0) {
            return result[0];
        }
        return null;
    } catch (error) {
        console.log('Error fetching order', error);
        
    }
};

export const updateOrderStatus = async (status, orderId) => {
    try {
        const query = `
            UPDATE orders
            SET status = ?, updated_at = CURRENT_TIMESTAMP
            WHERE orderId = ?
        `;
        const values = await executeQuery(query, [status, orderId]);
    } catch (error) {
        console.log('Error updating order status', error);
    }
};

export const deleteOrderById = async (orderId) => {
    try {
        const query = `DELETE FROM orders WHERE orderId = ?`;
        const values =await executeQuery(query, [orderId]);
    } catch (error) {
        console.log('Error deleting order', error);
    }
};