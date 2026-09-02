import mongoose from "mongoose";
const experienceSchema = new mongoose.Schema({ role: { type: String, required: true, trim: true }, organisation: { type: String, required: true, trim: true }, startDate: Date, endDate: Date, current: { type: Boolean, default: false }, description: { type: String, default: "" }, technologies: { type: [String], default: [] }, order: { type: Number, default: 0 }, published: { type: Boolean, default: true } }, { timestamps: true });
export default mongoose.model("Experience", experienceSchema);
