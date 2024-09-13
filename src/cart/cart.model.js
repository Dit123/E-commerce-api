import { executeQuery } from "../config.js/database.js";

export const createCartTable = async () => {
    try {
        const cartTableQuery = `
            CREATE TABLE IF NOT EXISTS cart (
                cartID VARCHAR(225) PRIMARY KEY NOT NULL,
                userID VARCHAR(225) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userID) REFERENCES users(userID)
            )
        `;

        const cartItemsTableQuery = `
            CREATE TABLE IF NOT EXISTS cart_items (
                itemID VARCHAR(225) PRIMARY KEY NOT NULL,
                cartID VARCHAR(225) NOT NULL,
                productID INT NOT NULL,
                quantity INT NOT NULL,
                FOREIGN KEY (cartID) REFERENCES cart(cartID),
                FOREIGN KEY (productID) REFERENCES products(id)
            )
        `;

        await executeQuery(cartTableQuery, []);
        await executeQuery(cartItemsTableQuery, []);
        console.log('Cart and Cart Items tables created successfully');
    } catch (error) {
        console.log('Error creating cart tables', error);
    }
};