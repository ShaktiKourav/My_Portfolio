import mongoose from "mongoose";
const certificateSchema = new mongoose.Schema({ title: { type: String, required: true, trim: true }, issuer: { type: String, required: true, trim: true }, issuedDate: Date, credentialId: { type: String, default: "" }, credentialUrl: { type: String, default: "" }, imageUrl: { type: String, default: "" }, fileUrl: { type: String, default: "" }, published: { type: Boolean, default: false }, order: { type: Number, default: 0 } }, { timestamps: true });
export default mongoose.model("Certificate", certificateSchema);
