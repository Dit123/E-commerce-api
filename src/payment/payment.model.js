import { executeQuery } from "../config.js/database.js";

export const createPaymentTable = async () => {
    try {
        const query = `CREATE TABLE IF NOT EXISTS payment (
                paymentID INT PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(225) NOT NULL,
                amount DOUBLE PRECISION DEFAULT 0 CHECK (amount >= 0) NOT NULL,
                currency VARCHAR(3) CHECK (currency IN ('USD', 'NGN')) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`;

        await executeQuery(query, []);
    } catch (error) {
        console.log('Error creating payment table', error);
    }
}