import Project from "../models/Project.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
export const listPublishedProjects = asyncHandler(async (_request, response) => { const projects = await Project.find({ published: true }).sort({ order: 1, createdAt: -1 }).lean(); response.json(projects.map(({ technologies, ...project }) => ({ ...project, tech: technologies }))); });
