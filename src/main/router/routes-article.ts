import { Router } from "express";
import { RoutesArticleAdapter } from "../adapters/controllers/routes-article.adapter";
import { articleFactor } from "../factors/controller/article.factor";
import { middlewareAdapter } from "../adapters/middlewares/middleware-article.adapter";
import { articleIdexistsFactor } from "../factors/middleware/articleId-exists.factor";

export function routesArticle(router: Router) {
    const articleAdapter = new RoutesArticleAdapter(articleFactor())
    const articleIdExists = middlewareAdapter(articleIdexistsFactor())
    router.post("/article", articleAdapter.add())
    router.get("/article", articleAdapter.find())
    router.get("/article/:id", articleIdExists, articleAdapter.findId())
    router.patch("/article/:id", articleIdExists, articleAdapter.update())
    router.delete("/article/:id", articleIdExists, articleAdapter.delete())
}