/* global process */
import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/db.js";

const port = Number(process.env.PORT || 5000);

connectDatabase()
  .then(() => app.listen(port, () => console.log(`Portfolio API running at http://localhost:${port}`)))
  .catch((error) => { console.error(`API startup failed: ${error.message}`); process.exit(1); });
