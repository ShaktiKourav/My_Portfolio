import mongoose from "mongoose";
const profileSchema = new mongoose.Schema({ name: { type: String, required: true, trim: true }, headline: { type: String, default: "" }, bio: { type: String, default: "" }, location: { type: String, default: "" }, email: { type: String, default: "" }, photoUrl: { type: String, default: "" }, resumeUrl: { type: String, default: "" }, socials: { github: String, linkedin: String, instagram: String } }, { timestamps: true });
export default mongoose.model("Profile", profileSchema);
