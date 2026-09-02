import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({ name: { type: String, required: true, trim: true, maxlength: 100 }, email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 }, message: { type: String, required: true, trim: true, maxlength: 5000 }, status: { type: String, enum: ["new", "read", "archived"], default: "new" } }, { timestamps: true });
export default mongoose.model("Message", messageSchema);
