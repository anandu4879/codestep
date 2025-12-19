import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";

export const inngest = new Inngest({id: "codestep"});

const syncUser = inngest.createFunction(
    {name: "Sync-user"},
    {event: "clerk/user.created"},
    async({event})=>{
        await connectDB();
        
        const {id,first_name,email_addresses,last_name,image_url}= event.data;

        const email = email_addresses?.[0]?.email_address;

if (!email) {
  throw new Error("User email missing from Clerk event");
}

const newUser = {
  clerkId: id,
  email,
  name: `${first_name || ""} ${last_name || ""}`.trim(),
  profileImage: image_url
};

await User.create(newUser);
    }
)

const deleteUserFromDB = inngest.createFunction(
    {id: "delete-user-from-db"},
    {event: "clerk/user.deleted"},
    async({event})=>{
        await connectDB();
        
        const {id}= event.data;

       await User.deleteOne({clerkId:id});
       

        //to do smthg esle
    }
)

export const functions=[syncUser,deleteUserFromDB]