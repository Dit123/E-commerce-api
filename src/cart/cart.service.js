import { executeQuery } from "../config.js/database.js";
import { my_id } from "../utils/uuid.js";

export const getCartByUserId = async (userId) => {
    const query = `SELECT * FROM cart WHERE userID = ?`;
    const results = await executeQuery(query, [userId]);
    return results.length ? results[0] : null;
};


export const createNewCart = async (userId) => {
    const cartId = my_id;
    const query = `INSERT INTO cart (cartID, userID) VALUES (?, ?)`;
    await executeQuery(query, [cartId, userId]);
    return { cartId, userId };
};


export const addItemToCart = async (cartId, productId, quantity) => {
    const itemId = my_id; 
    const query = `
        INSERT INTO cart_items (itemID, cartID, productID, quantity) 
        VALUES (?, ?, ?, ?) 
        ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
    `;
    await executeQuery(query, [itemId, cartId, productId, quantity]);
};



export const getCartItems = async (cartId) => {
    const query = `SELECT * FROM cart_items WHERE cartID = ?`;
    const results = await executeQuery(query, [cartId]);
    return results;
};



export const removeItemFromCart = async (cartId, productId) => {
    const query = `DELETE FROM cart_items WHERE cartID = ? AND productID = ?`;
    await executeQuery(query, [cartId, productId]);
};



export const clearCart = async (cartId) => {
    const query = `DELETE FROM cart_items WHERE cartID = ?`;
    await executeQuery(query, [cartId]);
};