// require ('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/db_connection.js";


dotenv.config({
    path:'./env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server running on port ${process.env.PORT}`)
    })
    {}
})
.catch((err) => {
    console.log("Mongodb connection failed", err);
})

/*
mongoose connect with db so importing mongoose
import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from "express";
const app = express();

( async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error) => {
            console.log("error",error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listining on port ${process.env.PORT}`);
        })
    } catch (error)
    {
        console.log("error",error)
        throw error
    }
})()
*/