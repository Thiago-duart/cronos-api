import { Router } from "express";
import { RoutesArticleAdapter } from "../adapters/routes-article.adapter";
import { articleFactor } from "../factors/article.factor";

export function routesArticle(router: Router) {
    const articleAdapter = new RoutesArticleAdapter(articleFactor())
    router.post("/article", articleAdapter.add())
    router.get("/article", articleAdapter.find())
    router.get("/article/:id", articleAdapter.findId())
    router.patch("/article/:id", articleAdapter.update())
    router.delete("/article/:id", articleAdapter.delete())
}