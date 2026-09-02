import Message from "../models/Message.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
export const createMessage = asyncHandler(async (request, response) => { const { name, email, message } = request.body; if (![name, email, message].every((field) => typeof field === "string" && field.trim())) return response.status(400).json({ message: "Name, email, and message are required." }); if (!/^\S+@\S+\.\S+$/.test(email)) return response.status(400).json({ message: "Please enter a valid email address." }); await Message.create({ name, email, message }); response.status(201).json({ message: "Thanks — your message has been sent." }); });

export const listMessages = asyncHandler(async (_request, response) => response.json(await Message.find().sort({ createdAt: -1 })));
export const updateMessage = asyncHandler(async (request, response) => { const message = await Message.findByIdAndUpdate(request.params.id, { status: request.body.status }, { new: true, runValidators: true }); if (!message) return response.status(404).json({ message: "Message not found." }); response.json(message); });
