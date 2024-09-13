import { executeQuery } from "../config.js/database.js";



export const createUserTable = async () => {
    try {
        const query = ` CREATE TABLE IF NOT EXISTS users (
        userID VARCHAR(225) PRIMARY KEY NOT NULL,
        firstName VARCHAR(225)NOT NULL,
        lastName VARCHAR(225)NOT NULL,
        gender VARCHAR(225)NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(36)NOT NULL DEFAULT 'customer'
        )`;


        await executeQuery(query, []);
        /*console.log ('User table created successfully');*/
    } catch (error) {
        console.log ('Error creating user table', error);
    }
}

