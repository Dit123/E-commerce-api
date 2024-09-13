import { executeQuery } from "../config.js/database.js";

export const addPayment = async (orderId, email, amount, currency) => {
    try {
        const query = `
            INSERT INTO payment (email, amount, currency)
            VALUES (?, ?, ?)
        `;
        const result = await executeQuery(query, [orderId, email, amount, currency]);
        console.log('Payment added successfully');
        return result.insertId
    } catch (error) {
        console.error('Error adding payment:', error);
    }
};

export const getPaymentsByEmail = async (email) => {
    try {
        const query = `
            SELECT * FROM payment
            WHERE email= ?
            ORDER BY created_at DESC
        `;
        const results = await executeQuery(query, [email]);
        return results;
    } catch (error) {
        console.error('Error retrieving payments:', error);
    }
};


export const getPaymentByID = async (paymentID) => {
    try {
        const query = `
            SELECT * FROM payment
            WHERE paymentID = ?
        `;
        const results = await executeQuery(query, [paymentID]);
        return results;
    } catch (error) {
        console.error('Error retrieving payment by ID:', error);
    }
};


export const updatePayment = async (paymentID, amount, currency) => {
    try {
        const query = `
            UPDATE payment
            SET amount = ?, currency = ?
            WHERE paymentID = ?
        `;

        //console.log('Executing query:', query);
        //console.log('With values:', [amount, currency, paymentID]);

        await executeQuery(query, [amount, currency, paymentID]);
        console.log('Payment updated successfully');
    } catch (error) {
        console.error('Error updating payment:', error);
    }
};

export const deletePayment = async (paymentID) => {
    try {
        const query = `
            DELETE FROM payment
            WHERE paymentID = ?
        `;
        await executeQuery(query, [paymentID]);
        console.log('Payment deleted successfully');
    } catch (error) {
        console.error('Error deleting payment:', error);
    }
};

export const updatePaymentstatus = async (paymentID, updateData) => {
    try {
        const setClause = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
        const values = Object.values(updateData);
        values.push(paymentID);

        const query = `
            UPDATE payment
            SET ${setClause}
            WHERE paymentID = ?
        `;

        await executeQuery(query, values);
    } catch (error) {
        console.error('Error updating payment:', error);
    }
};
