import jwt from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/userModel.js";
 
export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.headers;
    // console.log(req.headers,'the req is ')
    // console.log()

    if(!token)
    return next(new ErrorHandler("Not logged in",401))

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id)

    next();
})

// import jwt from "jsonwebtoken";
// import { catchAsyncError } from "./catchAsyncError.js";
// import ErrorHandler from "../utils/errorHandler.js";
// import { User } from "../models/userModel.js";
 
// export const isAuthenticated = catchAsyncError(async (req, res, next) => {
//     const { token } = req.cookies;

//     if (!token)
//         return next(new ErrorHandler("Not logged in", 401));

//     const authorizationHeader = `Bearer ${token}`; // Add "Bearer" prefix
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//      req.headers.authorization = authorizationHeader; // Set Authorization header
//     req.user = await User.findById(decoded._id).select("-password");

//     next();
// });


// export const isAuthenticated = catchAsyncError(async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];

//       //decodes token id
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.user = await User.findById(decoded._id).select("-password");

//       next();
//     } catch (error) {
//       res.status(401);
//       throw new Error("Not authorized, token failed");
//     }
//   }

//   if (!token) {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }
// });
 
 