import express from "express";
import helmet from "helmet";
import "dotenv/config";
import { router } from "./routes/route";
import mongoose from "mongoose";

const app = express();
/**
 * Body Parser
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/**
 * Helmet
 */
app.use(helmet());

/**
 * Routes
 */

app.use(router);

/**
 * DB Connected
 */

mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Database is Connected ");
});

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log("server is running at http://localhost:" + port);
});
