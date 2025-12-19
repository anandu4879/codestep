import { userAgent } from "next/server";

export async function getStreamToken(req, res) {
    try {
        const token=chatClient.createToken(req.auth.clerkId);
        return res.status(200).json({
            token,
            userId:req.user.clerkId,
            username:req.user.name,
            userImage:req.user.image
        });
    } catch (error) {
        console.error("Error in getStreamToken:", error);
        res.status(500).json({msg:"Internal Server Error"});
        
    }
}