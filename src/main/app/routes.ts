import { Express, Router } from "express";
import { routesArticle } from "../router/routes-article";

export const routerConfig = (app: Express) => {
  const router = Router();
  app.use("/api", router);
  routesArticle(router)
};
