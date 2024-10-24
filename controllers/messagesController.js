// database models
import Message from "../database/models/Message.js";

export default {
  async all(req, res) {
    try {
      const messages = await Message.find();
      const messagesWithBase64 = messages.map((message) => {
        return {
          ...message.toObject(),
          chunks: message.chunks.map((chunk) => chunk.toString("base64")),
        };
      });

      res.send(messagesWithBase64);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching messages." });
    }
  },
};
