import { executeQuery } from "../config.js/database.js";

export const savetoken = async (token, user) => {
    try {
        const query = `INSERT INTO token (Refreshtoken, user)
        VALUES (?, ?)
        `
        const values = await executeQuery(query, [ token, user]);
    } catch (error) {
        console.log('error inserting token', error);
        
    }
}


export const gettoken = async (token, user) => {
    try {
        const query = ` SELECT * FROM token WHERE Refreshtoken = ?, user = ?
        `
        const values = await executeQuery(query, [ token, user]);
    } catch (error) {
        console.log('error getting token', error);
        
    }
}


export const logout = async (user) => {
    try {
        const query = `DELETE FROM token WHERE user =?
        `
        const values = await executeQuery(query, [ user]);
    } catch (error) {
        console.log('error deleting token', error);
        
    }
}
