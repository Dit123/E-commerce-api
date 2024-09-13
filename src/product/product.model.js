import { executeQuery } from "../config.js/database.js";

export const createProductTable = async () => {
    try {
        const query = `CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            itemName VARCHAR(255) NOT NULL,
            description TEXT,
            price DECIMAL(10, 2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            stock INT NOT NULL,
            imageUrl VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`;
        await executeQuery(query, []);
        console.log('Product table created successfully');
    } catch (error) {
        console.log('Error creating product table:', error);
    }
};
