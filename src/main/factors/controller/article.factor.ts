import { MongoArticleRepositore } from "../../../infra/db/mongodb/article-repositore/article.repositore";
import { ArticleController } from "../../../controllers/article/article";
import { DbArticle } from "../../../data/usecases/article/db-article";
import { Validator } from "../../../validation/validator.adapter";
import { logErrorDecoratorFactor } from "./log-error-decorator.factor";

export function articleFactor() {
    const validator = new Validator()
    const articleRepositore = new MongoArticleRepositore()
    const dbArticle = new DbArticle(articleRepositore)
    const articleController = new ArticleController(dbArticle, validator)
    return logErrorDecoratorFactor(articleController)
}