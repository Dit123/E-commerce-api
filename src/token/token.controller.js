import { response } from "express";
import { savetoken, gettoken, logout } from "./token.service.js";

export const savetokens = async (req, res) => {
    try {
        const token = await savetoken(req.params.token);
        res.status(200).json(token);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

export const gettokens = async (req, res) => {
    try {
        const token = await gettoken(req.params.token);
        response.status(200).json(token);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

export const logouts = async (req, res) => {
    try {
        const token = await logout(req.params.token);
        res.status(200).json(token)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};