import mongoose from 'mongoose';
import {ENV} from './env.js';

export const connectDB= async()=>{
    try{
        if(!ENV.DB_URL){
            throw new Error("Database URL is not defined in environment variables");
        }
        await mongoose.connect(ENV.DB_URL);
        console.log("Database connected successfully");
    }catch(err){
        console.log("Error connecting to database:", err);
        process.exit(1); //0 means success , 1 means failure
    }
}

