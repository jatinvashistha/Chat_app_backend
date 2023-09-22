import express from "express";
import { allUsers, getMyProfile, login, logout, register } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/").post(register)

router.route("/login").post(login)

router.route("/logout").get(logout)

router.route("/me").get(isAuthenticated, getMyProfile)

router.route("/").get(isAuthenticated,allUsers)




export default router;