import joi from 'joi';


export const signupSchema = joi.object({
    email: joi.string().email().required(),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    gender: joi.string().required(),
    password: joi.string().min(8).required()
})

export const createProductSchema = joi.object({
    itemName: joi.string().max(225).required(),
    description: joi.string().allow('').optional(),
    price: joi.number().precision(2).positive().required(),
    category: joi.string().max(255).required(),
    stock: joi.number().integer().positive().required()
})

export const updateProductSchema = joi.object({
    itemName: joi.string().max(225).required(),
    price: joi.number().precision(2).positive().required(),
    stock: joi.number().integer().positive().required(),
    id: joi.number().integer().positive().required()
})

export const deleteProductSchema = joi.object({
    itemName: joi.string().max(225).required(),
    id: joi.number().integer().positive().required()
})

export const updatepasswordSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required()
})

export const signinSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required()
})

export const forgotPasswordSchema = joi.object({
    email: joi.string().email().required(),
})


export const resetPasswordSchema = joi.object({
    otp: joi.number().min(4).required(),
    email: joi.string().email().required(),
    newPassword: joi.number().min(8).required()
})

export const getProductToCartSchema = joi.object({
    items: joi.array().items(
        joi.object({
            productId: joi.number().integer().required(),
            quantity: joi.number().integer().min(1).required(),
        })
    ).required(),
});

export const removeProductSchema = joi.object({
    productId: joi.number().integer().required()  
});

export const createPaymentSchema = joi.object({
    orderId: joi.number().integer().required(),
    email: joi.string().email().required(),
    amount: joi.number().positive().required(),
    currency: joi.string().valid('USD', 'NGN').required().messages({
        'any.only': 'Enter either USD or NGN'
    })
});

export const createOrderSchema = joi.object({
    email: joi.string().email().required(),
    itemName: joi.string().required(),
    amount: joi.number().positive().required()
});