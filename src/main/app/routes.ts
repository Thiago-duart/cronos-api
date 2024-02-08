import { Express, Router } from "express";

export const routerConfig = (app: Express) => {
  const router = Router();
  app.use("/viva", router);
  // routes(router);
};
