 import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);



schema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

schema.methods.getJWTToken = function () {
  
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "15 days",

    
  });

  
};

schema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };


export const User = mongoose.model("User", schema);



 