import { addProduct, updateProduct, deleteProduct, getAllProducts, getProductById } from "./product.service.js";
import { createProductSchema, deleteProductSchema, updateProductSchema } from "../validator/auth.js";

export const adminRoutes = {
    createproduct: async (req, res) => {
        try {
            const { error, value } = createProductSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.message });
            }
    
            const { itemName, description, price, category, stock } = value;
    
            await addProduct(itemName, description, price, category, stock);
            
            return res.status(200).json({message: "creating product is sucessful"});
        } catch (error) {
            return res.status(500).json({error: 'Internal server error'})
        }
    },
    updateProductById: async (req, res) => {
        try {
            const {error, value } = updateProductSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.message });
            }
            
            const { itemName, price, stock, id} = value;
            //console.log('value: ', value)
            await updateProduct(itemName, price, stock, id);
            
            res.status(200).json({ message: 'Product updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error updating product', message: error.message });
        }
    },
    deleteProductById: async (req, res) => {
        try {
            const {error, value} = deleteProductSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.message})
            }
            
            const {itemName,id} = value;

            await deleteProduct(itemName,id);

            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting product', message: error.message });
        }
    }
};

export const getProductsById = async (req, res) => {
    
    console.log('Requested ID:', req.params.id);
    try {
        const product = await getProductById(req.params.id);
        
        console.log('controller product: ', product)
        
        if (!product || product.length === 0) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getsAllProducts = async (req, res) => {
    try {
        const products = await getAllProducts(req.params.id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
