import mongoose from "mongoose";

const platformSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  type: { type: String, default: "Platform", trim: true, maxlength: 40 },
  url: { type: String, required: true, trim: true, maxlength: 500 },
  description: { type: String, default: "", trim: true, maxlength: 240 },
  icon: { type: String, default: "", trim: true, maxlength: 40 },
  published: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Platform", platformSchema);
