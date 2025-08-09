import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        //mongoose returns an object so it can be stored in a variable here it is connectionInstance
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)  
       
       /*mongoose.connect returns a Mongoose connection object.

        This object has details like:
        .connection.host : Tells which host is connected
        .connection.name
        .connection.port*/

       console.log(`\n MONGODB connected!! DB HOST: ${connectionInstance.connection.host}`);     
    } catch (error) {
        console.error("MONGODB connection error",error)
        process.exit(1)       
    }
}

export default connectDB