import Certificate from "../models/Certificate.js";
import Experience from "../models/Experience.js";
import Profile from "../models/Profile.js";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const models = { projects: Project, skills: Skill, certificates: Certificate, experiences: Experience };
const sort = { projects: { order: 1, createdAt: -1 }, skills: { order: 1, createdAt: -1 }, certificates: { order: 1, createdAt: -1 }, experiences: { order: 1, startDate: -1 } };
const formattedProject = (document) => { const { technologies, ...project } = document; return { ...project, tech: technologies }; };

export const getProfile = asyncHandler(async (_request, response) => response.json((await Profile.findOne().lean()) || {}));
export const updateProfile = asyncHandler(async (request, response) => response.json(await Profile.findOneAndUpdate({}, request.body, { new: true, upsert: true, runValidators: true })));
export const listPublic = (kind) => asyncHandler(async (_request, response) => { const data = await models[kind].find({ published: true }).sort(sort[kind]).lean(); response.json(kind === "projects" ? data.map(formattedProject) : data); });
export const listAdmin = (kind) => asyncHandler(async (_request, response) => response.json(await models[kind].find().sort(sort[kind])));
export const create = (kind) => asyncHandler(async (request, response) => { const item = await models[kind].create(request.body); response.status(201).json(item); });
export const update = (kind) => asyncHandler(async (request, response) => { const item = await models[kind].findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true }); if (!item) return response.status(404).json({ message: "Item not found." }); response.json(item); });
export const remove = (kind) => asyncHandler(async (request, response) => { const item = await models[kind].findByIdAndDelete(request.params.id); if (!item) return response.status(404).json({ message: "Item not found." }); response.status(204).end(); });
