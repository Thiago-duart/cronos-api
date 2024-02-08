import express from "express";
import "dotenv/config";
import { middlewaresConfig } from "./middleware";
import { routerConfig } from "./routes";

const app = express();

middlewaresConfig(app);
routerConfig(app);
export default app;
