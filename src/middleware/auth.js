import jwt from "jsonwebtoken";
import { config } from "../config.js/env.js";
import { getUserByEmail } from "../user/user.service.js";


export const auth = async   (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized no authHeader' });
    }

    const token = authHeader.split(' ')[1];

    console.log("token: ", token);

    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }

    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) {
          console.error('JWT Verification Error: ', err.message);
          return res.status(403).json({ error: 'Invalid token, you cant access this endpoint' });
        }
        req.user = user;
        next();
    });

};

export const isAdmin =  async (req, res, next) => {
  try {
    const user = req.user;
    console.log('user email: ', user);
    const userProfile = await getUserByEmail(user.email);
    
    console.log('user profile: ', userProfile);
    
    if (!userProfile || userProfile.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (userProfile[0].role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    } 

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Inteernal server error', error: error.message });
  }
}
  


export const verifyAccessToken = (token) => {
    try {
      return jwt.verify(token, config.jwtSecret);
    } catch (error) {
      throw new Error('Invalid access token');
    }
  };
  
  export const verifyRefreshToken = (token) => {
    try {
      return jwt.verify(token, config.jwtRefreshSecret);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  };
  
  
  export const verifyResetToken = (token) => {
    try {
      return jwt.verify(token, process.env.RESET_TOKEN_SECRET);
    } catch (error) {
      return null;
    }
  };
  