import express from 'express';
import {ENV} from './lib/env.js';
import path from 'path';
import { connectDB } from './lib/db.js';
import cors from 'cors';
import{serve} from 'inngest/express';
import { inngest,functions } from './lib/inngest.js';

const app= express();

const  __dirname = path.resolve();

//middleware
app.use(express.json());

//server allows a browser to include cookies on requests
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));


app.use("/api/inngest",serve({client: inngest,functions}));


app.get("/health",(req,res)=>{
    res.status(200).json({msg:"success from api health "})
});

app.get("/books",(req,res)=>{
    res.status(200).json({data:"sample data from api"})
});

// make  app ready for deployment

if(ENV.NODE_ENV==="deployment"){
    app.use(express.static(path.join(__dirname,'../frontend/dist')));

    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,'../frontend/dist/index.html'));
    });
}


const startServer= async()=>{
    try{
        await connectDB();
        app.listen(ENV.PORT,()=>{
            console.log(`Server started on port ${ENV.PORT}`);
        });
    }catch(err){
        console.log("Error starting server:", err);
        process.exit(1);
    }
}

startServer();