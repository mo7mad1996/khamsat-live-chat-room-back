// database models
import Group from "../database/models/Group.js";
import Message from "../database/models/Message.js";

export default {
  async all(req, res) {
    try {
      const groups = await Group.find();
      res.send(groups);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching groups." });
    }
  },
  async messages(req, res) {
    const { groupId } = req.params;
    const messages = await Message.find({ groupId });
    res.send(messages);
  },
};
