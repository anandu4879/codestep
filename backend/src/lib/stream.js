import {StreamChat} from 'stream-chat';
import {StreamClient} from '@stream-io/node-sdk';
import { ENV } from './env.js';

const apikey=ENV.STREAM_API_KEY;
const apiSecret=ENV.STREAM_API_SECRET; 

if(!apikey || !apiSecret){
    console.error("Stream API key or secret is missing");
    throw new Error("Stream API key or secret is missing");
};
export const chatClient= StreamChat.getInstance(apikey,apiSecret);// chat features
export const streamClient= new StreamClient(apikey,apiSecret);// for video call

export const upsertStreamUser= async(userData)=>{
    try{
        await streamClient.upsertUser(userData);
        console.log("Upserted/Created Stream user", userData);
    }catch(err){
        console.log("Error in upserting stream user",err);
    }
}
export const DeleteStreamUser= async(userId)=>{
    try{
        await streamClient.deleteStreamUser(userId);
        console.log(`Deleted Stream user with ID: ${userId}`);
    }catch(err){
        console.log("Error in deleting stream user",err);
    }
}