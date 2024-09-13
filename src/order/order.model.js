import { executeQuery } from "../config.js/database.js";

export const createOrderTable = async () => {
    try {
        const query = ` CREATE TABLE IF NOT EXISTS orders(
        orderId INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(225) NOT NULL,
        itemName VARCHAR(255) NOT NULL,
        amount DOUBLE PRECISION DEFAULT 0 CHECK (amount >= 0) NOT NULL,
        status VARCHAR(36) NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

        await executeQuery(query, []);
    } catch (error) {
        console.log('Error creating order table', error);
        
    }
}
