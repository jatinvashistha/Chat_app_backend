import mongoose from "mongoose";




export const connectedDB = async()=>{
 const {connection} = await mongoose.connect(process.env.MONGO_URI)

 console.log(`database connect with ${connection.host}`)
}
