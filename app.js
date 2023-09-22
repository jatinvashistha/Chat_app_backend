import express from "express";
import { config } from "dotenv"
import ErrorMiddleware from "./middlewares/Error.js";
 import cookieParser from "cookie-parser";
import { chats } from "./data/data.js"
import cors from "cors";
//  import { Server } from "socket.io";
 

config({
    path:"./config/config.env"
})

const app = express();


app.use(express.json());
app.use(express.urlencoded({
    extended:true,
}));

 app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:["GET","POST","PUT","DELETE"],

}))
app.use(cookieParser())

import userRoutes from './routes/userRoutes.js'; 
import chatRoutes from './routes/chatRoutes.js'; 
import messageRoutes from './routes/messageRoutes.js'; 
   
 

app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/message", messageRoutes)

 
export default app;

app.get("/",(req,res)=>{
    res.send(
       ` <h1>Site is Working. Click <a href=${process.env. FRONTEND_URL}>here</a> to vist frontend.</h1>`
    )
})

app.use(ErrorMiddleware)