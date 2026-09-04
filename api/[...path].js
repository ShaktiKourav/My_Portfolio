import app from "../server/app.js";
import { connectDatabase } from "../server/config/db.js";

let databaseConnection;

async function ensureDatabaseConnection() {
  if (!databaseConnection) {
    databaseConnection = connectDatabase().catch((error) => {
      databaseConnection = undefined;
      throw error;
    });
  }
  await databaseConnection;
}

export default async function handler(request, response) {
  try {
    await ensureDatabaseConnection();
    return app(request, response);
  } catch (error) {
    console.error("Vercel API startup failed:", error);
    return response.status(503).json({ message: "The portfolio data service is unavailable. Please try again shortly." });
  }
}
