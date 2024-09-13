import { executeQuery } from "../config.js/database.js";


export const findUser = async (email) => {
    try {
        const query = `SELECT * FROM users WHERE email = ?`;
        const users = await executeQuery(query, [email]);
        return users;
    } catch (error) {

        console.log('Error finding user', error);

    }
}



  export const getUserByEmail = async (email) => {
    try {
      const query = `SELECT * FROM users WHERE email = ?`;
      const users = await executeQuery(query, [email]);

      console.log('user: ', users)
      
      if (users.length > 0) {
        return users; 
      }
  
      return null; 
    } catch (error) {
      console.log('Error finding user by email', error);
      throw error;
    }
  };


export const getUserById = async (userID) => {
    try {
      const query = `SELECT * FROM users WHERE userID = ?`;
      const users = await executeQuery(query, [userID]);
      return users;
    } catch (error) {
      console.log('Error finding user by ID', error);
      throw error;
    }
  };

export const createUser = async (userID, firstName, lastName, gender, email, password) => {
    try {
        const query = `INSERT INTO users (userID, firstName, lastName, gender, email, password) VALUES (?, ? ,?, ?, ?, ?)`;
        const result = await executeQuery(query, [userID ,firstName, lastName, gender, email, password]);
        return result;
    } catch (error) {
        console.log('Error creating user', error);
    }
}


export const getUsers = async () => {
    try {
        const query = `SELECT * FROM users`;
        const users = await executeQuery(query, []);
        return users;
    } catch (error) {
        console.log('Error getting users', error);
    }
}

export const getUserByfirstName = async () =>{
    try {
        const query =`SELECT * FROM users WHERE firstName = ?`;
        const users = await executeQuery(query, {firstName});
        return users;
    } catch (error) {
        console.log('Error getting users by firstName',error);
    }
}

export const updateUserPassword = async (password, userID) => {
    try {
      const query = `UPDATE users SET password = ? WHERE userID = ?`;
      const result = await executeQuery(query, [password, userID]);
      return result;
    } catch (error) {
      console.log('Error updating user password', error);
      throw error;
    }
  };