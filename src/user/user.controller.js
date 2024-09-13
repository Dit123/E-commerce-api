import { resetPasswordSchema, signupSchema} from "../validator/auth.js";
import { hashPassword, comparePassword, newpassword } from "../utils/bcrypt.js";
import { sanitizer } from "../utils/sanitizer.js";
import { my_id } from "../utils/uuid.js";
import { findUser, createUser, getUserByEmail } from "./user.service.js";
import { updatepasswordSchema, forgotPasswordSchema } from "../validator/auth.js";
import { signinSchema } from "../validator/auth.js";
import { generateAccessToken, generateRefreshToken} from "../utils/jwt.js";
import { savetoken } from "../token/token.service.js";
import { updateUserPassword } from "./user.service.js";
import { sendOtp } from "../config.js/nodemailer.js";
import { createOtp } from "../utils/otp.js";

export const signup = async (req, res) => {

    try {
        const { error, value } = signupSchema.validate(req.body);

        if (error) {
          return res.status(400).json({ error: error.message });
        }

        const { firstName, lastName, gender, email, password } = value;

        const users = await findUser(email);

        if (users.length > 0) {
          return res.status(409).json({ error: "User already exists" });
        }

        const hashedPassword = await hashPassword(password);

        const user = await createUser(my_id, firstName, lastName, gender, email, hashedPassword);
        
        return res.status(201).json({
            message: "User created successfully",
            user
        })

    } catch (error) {

        console.log('Error signing up user', error);
        return res.status(500).json({ error: 'Internal server error' });

    }
};


export const signin = async (req, res) => {
  try {
    const { error, value } = signinSchema.validate(req.body);
    //console.log(value);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const { email, password } = value;

    const user = await getUserByEmail(email);
    //console.log('User retrieved:', user);

    
    if (user.length == 0) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const userdetails = user[0]
    const isPasswordValid = await comparePassword(password, userdetails.password);
    //console.log('Password:', password);
    //console.log('Hashed Password:', user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "password" });
    }

    const accessToken = generateAccessToken({email: userdetails.email, id: userdetails.userID,  isvalid: true});
    const refreshToken = generateRefreshToken({email: userdetails.email, id: userdetails.userID, isvalid: true});

    await savetoken(refreshToken, userdetails.userID);

    return res.status(200).json({
      message: "Signed in successfully",
      accessToken,
      refreshToken
    });

  } catch (error) {
    console.log('Error signing in user', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



export const updateUsersPassword = async (req, res) => {
  try {
    //console.log("require body:", req.body);
    const {error, value } = updatepasswordSchema.validate(req.body);

    if (error){
      return res.status(400).json({ error: error.message});
    }

    const { email, password } = value;
    //console.log("Password before hashing:", password);

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = await hashPassword(password);

    await updateUserPassword(user.userID, hashedPassword);

    return res.status(200).json({
      message: "Password updated successfully"
    });

  } catch (error) {
    console.log('Error updating password', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


export const forgotPassword = async (req, res) => {
 
  console.log('Email recieved:', req.body);
  const { error, value } = forgotPasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const {email} = value;

  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  
  const getotp = createOtp
  const hashedOtp = await hashPassword(getotp);
  
  await sendOtp(user.email, getotp);
  await updateUserPassword(hashedOtp, user.userID);

  return res.status(200).json({ message: "Password reset email sent" });
};


export const resetPassword = async (req, res) => {

  const { error, value } = resetPasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    const {otp, email, newPassword} = value;

    //console.log("newpassword:", newPassword);


  const user = await findUser(email);
  if(user.length == 0){
    return res.status(404).json({message:"user not found"});
  }

  const usercre = user[0]

  const isMatch = await comparePassword(otp.toString(), usercre.password);
  //console.log("usercre:", usercre.password);
  //console.log("otp:", otp);
  
  

  if (!isMatch) {
    return res.status(401).json({
      error: "Invalid OTP"
    })
  }

  const hashedPassword = await newpassword(newPassword.toString());
  //console.log("new hashed password:", hashedPassword);
   
 
  await updateUserPassword(hashedPassword, usercre.userID);

  return res.status(200).json({ message: "Password has been reset" });
};

