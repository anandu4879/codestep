import { clerkClient, requireAuth, getAuth } from '@clerk/express'
import User from '../models/User.js';

export const protectRoute= [
    requireAuth(),
    async (req,resizeBy,next)=>{
        try {
            const clerkId=req.auth().UserId;
            if(!clerkId){
                return res.status(401).json({msg:"Unauthorized - invalid token"});
            }

            //find user in db
            const user= await User.findOne({clerkId});
            if(!user){
                return res.status(404).json({msg:"User not found"});
            }

            //attsach user to req object
            req.user=user;
            next();
        } catch (error) {
            console.error("Error in protectRoute middleware:", error);
            res.status(500).json({msg:"Internal Server Error"});
            
        }
    }
]