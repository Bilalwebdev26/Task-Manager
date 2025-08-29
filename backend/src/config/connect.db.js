import mongoose from "mongoose"
import { dbName } from "./db.name.js"

export const connectDB = async()=>{
    try {
       const connectionDB =  await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`)
       console.log("Host DB : ",connectionDB.connection.host)
    } catch (error) {
        console.log("Error in connecting Database : ",error)
        process.exit(1)//forceFully exit 
    }
}