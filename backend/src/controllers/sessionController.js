import { StreamClient } from "@stream-io/node-sdk";
import Session from "../models/Session.js";
import { chatClient } from "../lib/stream.js";
export async function createSession(req, res) {
    try {
        const {problem,difficulty}=req.body;
        const userId=req.user._id;
        const clerk=req.user.clerkId;

        if(!problem || !difficulty){
            return res.status(400).json({msg:"Problem and difficulty are required to create a session"});
        }

        //create unique callId
        const callId=`session-${Date.now()}_${Math.random().toString(36).substring(7)}`;
        //create session in db
        const session= await Session.create({problem,difficulty,host:userId,callId});

        //create video call in stream
        await StreamClient.video.call("default",callId).getOrCreate({
            data:{
                created_by_id:clerk,
                custom:{difficulty,problem,sessionId:session._id.toString()}
            },
        });

        //chat messaging
        const channel=chatClient.channel("messaging",callId,{
            name: `${problem} Session`,
            created_by_id: clerkId,
            members:[clerkId],

        })
        await channel.create();
        res.status(201).json({msg:"Session created successfully",session});
    } catch (error) {
        console.error("Error in creating session:", error);
        res.status(500).json({msg:"Internal server error while creating session"});
    }
}

export async function getActiveSessions(_, res) {
    try {
        await Session.find({status:"active"})
        .populate("host","name profileImage email clerkId")
        .sort({createdAt:-1})
        .limit(20);

        res.status(200).json({msg:"Active sessions fetched successfully",sessions});
    } catch (error) {
        console.error("Error in fetching active sessions:", error);
        res.status(500).json({msg:"Internal server error while fetching active sessions"});
    }
}

export async function getRecentSessions(req, res) {
    try {
        const user_id=req.user._id;

        const session=await Session.find({status:"completed", $or: [{host:user_id}, {participant:user_id}]})
        .populate("host","name profileImage email clerkId")
        .sort({createdAt:-1})
        .limit(20);

        res.status(200).json({msg:"Recent sessions fetched successfully",sessions});
    } catch (error) {
        console.error("Error in fetching recent sessions:", error);
        res.status(500).json({msg:"Internal server error while fetching recent sessions"});
    }
}

export async function getSessionsById(req, res) {
    try {
        const {id}=req.params

        const session= await Session.findById(id)
        .populate("host","name profileImage email clerkId")
        .populate("participant","name profileImage email clerkId");

        if(!session){
            return res.status(404).json({msg:"Session not found"});
        }
        
        res.status(200).json({msg:"Session fetched successfully",session});
    } catch (error) {
        console.error("Error in fetching session by id:", error);
        res.status(500).json({msg:"Internal server error while fetching session by id"});
    }
}

export async function joinSession(req, res) {
    try {
        const {id}=req.params;
        const userId=req.user._id;
        const clerkId=req.user.clerkId;

        const session= await Session.findById(id);
        
        if(!session){
            return res.status(404).json({msg:"Session not found"});
        }

        if(session.participant) return res.status(400).json({msg:"Session already is full"});
        session.participant=userId;
        await session.save();

        const channel =chatClient.channel("messaging",session.callId);
        await channel.addMembers([clerkId]);

        res.status(200).json({msg:"Joined session successfully",session});
    } catch (error) {
        console.error("Error in joining session:", error);
        res.status(500).json({msg:"Internal server error while joining session"});
    }
}

export async function endSession(req, res) {
    try {
        const {id}=req.params;
        const userId=req.user._id;
        
        const session= await Session.findById(id);

        if(!session){
            return res.status(404).json({msg:"Session not found"});
        }
        //check if the user is the host
        if(session.host.toString()!==userId.toString()){
            return res.status(403).json({msg:"Only the host can end the session"});
        }
        // check session already completed
        if(session.status==="completed"){
            return res.status(400).json({msg:"Session already completed"});
        }
        session.status="completed";
        await session.save();
        
        //delete the video call
        const call= StreamClient.video.call("default",session.callId)
        await call.delete({hard:true});

        //deleete chat
        const channel= chatClient.channel("messaging",session.callId);
        await channel.delete();

        res.status(200).json({msg:"Session ended successfully",session});
    } catch (error) {
        console.error("Error in ending session:", error);
        res.status(500).json({msg:"Internal server error while ending session"});
    }
}