import ErrorHandler from "../utils/errorHandler.js";
import { generateToken, sendToken } from "../utils/sendToken.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import { User } from "../models/userModel.js"
 
// export const register = catchAsyncError(async (req, res, next) => {
//      const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return next(new ErrorHandler("Please enter all fields", 400));
//   }

//   let user = await User.findOne({ email });

//   if (user) {
//     return next(new ErrorHandler("User already exists", 409));
//   }

//   user = await User.create({
//     name,
//     email,
//     password,
//     pic,  
//   });

//     if (user) {
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       pic: user.pic,
//       token: sendToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error("User not found");
//   }

//   sendToken(res, user, "Registered Successfully", 201);
// })

export const register = catchAsyncError(async (req, res,next) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
     return next(new ErrorHandler("Please enter all fields", 400));
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
     return next(new ErrorHandler("User Already exist", 409 ));
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  // if (user) {
  //   res.status(201).json({
  //     _id: user._id,
  //     name: user.name,
  //     email: user.email,
  //     isAdmin: user.isAdmin,
  //     pic: user.pic,
  //       token: generateToken(user._id),
  //   });
  // } else {
  //   res.status(400);
  //   throw new Error("User not found");
  // }
  
   sendToken(res, user, "Registered Successfully", 201);

     
  
});


 //login

 export const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
           
 

    if (!email || !password)
      return next(new ErrorHandler("Please enter all field", 400));
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));
  
    const isMatch = await user.comparePassword(password);
  
    if (!isMatch)
     return next(new ErrorHandler("Incorrect Email or Password", 401));
   
   
   
  
    sendToken(res, user, "Login SuccessFully", 200);
  });

  //logout
  export const logout = catchAsyncError(async (req, res, next) => {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  });

    // get my profile
  export const getMyProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);
  
    res.status(200).json({
      success: true,
      user,
    });
  });

export const allUsers = catchAsyncError(async (req, res, next) => {
   const keyword = req.query.search ? {
    $or: [
      { name: { $regex: req.query.search, $options: "i" } },
      { email: { $regex: req.query.search, $options: "i" } },
    ]
  } : {};
   
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users)

   })