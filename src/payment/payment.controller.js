import { addPayment, getPaymentByID, updatePayment, deletePayment, getPaymentsByEmail, updatePaymentstatus } from "./payment.service.js";
import { createPaymentSchema } from "../validator/auth.js";
import { getOrderById} from "./order/order.service.js"

export const createPaymentController = async (req, res) => {
    try {
        const { error, value } = createPaymentSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { orderId, email, amount, currency } = value;
        
        const order = await getOrderById(orderId);

        if (order.amount !== amount) {
                    return res.status(400).json({ error: 'Amount does not match the order amount'})
        }
        await addPayment(orderId, email, amount, currency);
        res.status(201).json({ message: 'Payment created successfully' });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



export const getPaymentsByEmailController = async (req, res) => {
    try {
        const { email } = req.params;
        const payments = await getPaymentsByEmail(email);

        if (payments.length === 0) {
            return res.status(404).json({ message: 'No payments found for this email' });
        }

        res.status(200).json(payments);
    } catch (error) {
        console.error('Error retrieving payments by email:', error);
        res.status(500).json({ message: 'Error retrieving payments by email' });
    }
};


export const updatePaymentDetails = async (req, res) => {
    try {
        const paymentID = req.params.paymentID;
        const { amount, currency } = req.body;

        //console.log('Payment ID:', paymentID);
        //console.log('Amount:', amount);
        //console.log('Currency:', currency);

        if (!paymentID || !amount || !currency) {
            return res.status(400).json({ error: 'Payment ID, amount, and currency are required' });
        }

        await updatePayment(paymentID, amount, currency);
        res.status(200).json({ message: 'Payment updated successfully' });
    } catch (error) {
        console.error('Error updating payment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const updatePaymentController = async (req, res) => {
    try {
        const { paymentID } = req.params;
        const { amount, currency } = req.body;

        console.log('Updating payment with ID:', paymentID);
        console.log('New values:', { amount, currency });


        await updatePaymentstatus(paymentID, { amount, currency });
        res.status(200).json({ message: 'Payment updated successfully' });
    } catch (error) {
        console.error('Error updating payment:', error);
        res.status(500).json({ message: 'Error updating payment' });
    }
};

export const getPaymentByIdController = async (req, res) => {
    try {
        const { paymentID } = req.params;
        const payment = await getPaymentByID(paymentID);

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json(payment);
    } catch (error) {
        console.error('Error retrieving payment:', error);
        res.status(500).json({ message: 'Error retrieving payment' });
    }
};

export const removePayment = async (req, res) => {
    try {
        const paymentID = req.params;

        if (!paymentID) {
            return res.status(400).json({ error: 'Payment ID is required' });
        }

        await deletePayment(paymentID);
        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        console.error('Error deleting payment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};