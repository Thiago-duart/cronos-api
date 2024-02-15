import { ArticleController } from "../../controllers/article/article";
import { DbArticle } from "../../data/usecases/article/db-article";
import { AddArticleRepositore } from "../../infra/db/mongodb/article-repositore/article-repositore";
import { Validator } from "../../validation/validator.adapter";

export function articleFactor() {
    const validator = new Validator()
    const articleRepositore = new AddArticleRepositore()
    const dbArticle = new DbArticle(articleRepositore)
    const articleController = new ArticleController(dbArticle, validator)
    return articleController
}