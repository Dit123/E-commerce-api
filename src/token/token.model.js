import { executeQuery } from "../config.js/database.js";


export const createTokenTable = async () => {
    try {
        const query = ` CREATE TABLE IF NOT EXISTS token(
        Refreshtoken VARCHAR(255) NOT NULL,
        user VARCHAR(255) NOT NULL,
        FOREIGN KEY (user) REFERENCES users(userID)
    )`;

    await executeQuery(query, []);
    } catch (error) {
        console.log('Error creating token table', error);
        
    }
}