import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: false,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
    isAudio: {
      type: Boolean,
      default: false,
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
    chunks: {
      type: [Buffer],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
