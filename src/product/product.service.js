// used to create functions of the product

import { executeQuery } from "../config.js/database.js";
import { my_id } from "../utils/uuid.js";

export const addProduct = async (itemName, description, price, category, stock) => {
    try {
        const query = `
            INSERT INTO products (itemName, description, price, category, stock)
            VALUES (?, ?, ?, ?, ?)
        `;
        const result = await executeQuery(query, [itemName, description, price, category, stock]);
        return result.insertId;
    } catch (error) {
        console.log('Error adding product', error )
    }
};

export const updateProduct = async (itemName, price, stock, id) => {
    try {
        const query = `
            UPDATE products
            SET itemName = ?, price = ?, stock = ?
            WHERE id = ?
        `;
        await executeQuery(query, [itemName, price, stock,  id]);
    } catch (error) {
        console.log('Error updating product', error )
    }
};

export const deleteProduct = async (itemName,id) => {
    try {
        const query = `DELETE FROM products WHERE itemName = ? AND id = ?`;
        await executeQuery(query, [itemName,id]);
    } catch (error) {
        console.log('Error deleting product', error )
    }
};

export const getProductById = async (id) => {
    try {
        const query = `SELECT * FROM products WHERE id = ?`;
        const results = await executeQuery(query, [id]);
        console.log('getProductById results: ', results)
        return results;
    } catch (error) {
        console.log('Error getting product by id', error )
    }
};

export const getAllProducts = async () => {
    try {
        const query = `SELECT * FROM products`;
        const results = await executeQuery(query);
        return results;
    } catch (error) {
        console.log('Error getting all products', error )
    }
};
