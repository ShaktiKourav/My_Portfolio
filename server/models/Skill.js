import mongoose from "mongoose";
const skillSchema = new mongoose.Schema({ name: { type: String, required: true, trim: true, maxlength: 80 }, category: { type: String, default: "Other", trim: true }, proficiency: { type: Number, min: 0, max: 100, default: 50 }, icon: { type: String, default: "" }, iconUrl: { type: String, default: "", trim: true }, order: { type: Number, default: 0 }, published: { type: Boolean, default: true } }, { timestamps: true });
export default mongoose.model("Skill", skillSchema);
