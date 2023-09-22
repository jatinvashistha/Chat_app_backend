import app from "./app.js";
import { connectedDB } from "./config/database.js";
 import { Server } from "socket.io";

connectedDB();
 


const server =app.listen(process.env.PORT, () => {
    console.log(`server is working on ${process.env.PORT}`);
}); 


 const io = new Server(server, {
  pingTimeout: 60000 ,
  cors: {
    origin: "http://localhost:3000"
  }
});

io.on("connection", (socket) => {
//   console.log("A user connected");
   socket.on("setup", (userData) => {
       socket.join(userData._id);
       console.log(userData._id)
    socket.emit("connected");
   });
    
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
   socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
   });
    socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

