import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    console.log("=== CHAT TOKEN REQUEST ===");
    console.log("req.user:", req.user);
    console.log("req.auth:", req.auth);
    console.log("chatClient exists:", !!chatClient);

    if (!req.user) {
      return res.status(401).json({ msg: "User not attached to request" });
    }

    if (!chatClient) {
      return res.status(500).json({ msg: "chatClient not initialized" });
    }

    const clerkId = req.user.clerkId;

    const token = chatClient.createToken(clerkId);

    return res.status(200).json({
      token,
      userId: clerkId,
      userName: req.user.name,
      userImage: req.user.profileImage,
    });
  } catch (error) {
    console.error("❌ getStreamToken error:", error);
    res.status(500).json({ msg: error.message });
  }
}
