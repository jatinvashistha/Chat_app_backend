
 import { User } from "../models/userModel.js";
export const sendToken = (res,user,message,statusCode = 200)=>{

     const token = user.getJWTToken()

    const options = {
        expires:new Date(Date.now()+ 15 * 24 * 60 * 1000),
        httpOnly:true,
        // secure:true, 
        sameSite:"none",
    }

    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        message,
      user,
        token


    })

}

 import jwt from "jsonwebtoken"

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

 