// /* global process */
// import "dotenv/config";
// import app from "./app.js";
// import { connectDatabase } from "./config/db.js";

// const port = Number(process.env.PORT || 5000);

// connectDatabase()
//   .then(() => app.listen(port, () => console.log(`Portfolio API running at http://localhost:${port}`)))
//   .catch((error) => { console.error(`API startup failed: ${error.message}`); process.exit(1); });



/* global process */

import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/db.js";

let databaseConnected = false;

async function startServer() {
  if (!databaseConnected) {
    await connectDatabase();
    databaseConnected = true;
  }

  return app;
}

export default async function handler(request, response) {
  try {
    const server = await startServer();
    return server(request, response);
  } catch (error) {
    console.error(`API startup failed: ${error.message}`);

    return response.status(500).json({
      message: "Database connection failed.",
    });
  }
}

if (process.env.NODE_ENV !== "production") {
  const port = Number(process.env.PORT || 5000);

  startServer()
    .then(() => {
      app.listen(port, () => {
        console.log(`Portfolio API running at http://localhost:${port}`);
      });
    })
    .catch((error) => {
      console.error(`API startup failed: ${error.message}`);
      process.exit(1);
    });
}