import { ArticleIdExistsMiddleware } from "../../../controllers/middlewares/articleId-exists.middleware";
import { MongoArticleRepositore } from "../../../infra/db/mongodb/article-repositore/article.repositore";

export function articleIdexistsFactor() {
    const articleRepositore = new MongoArticleRepositore()
    const articleIdexistsMiddleware = new ArticleIdExistsMiddleware(articleRepositore)
    return articleIdexistsMiddleware
}