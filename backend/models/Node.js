import mongoose from "mongoose";

const nodeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Node', default: null }
}, { timestamps: true });

export default mongoose.model("Node", nodeSchema);
