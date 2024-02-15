import { LogArticleDecorator } from "../../../main/decorators/log-article.decorator";
import { IArticleController } from "../../../controllers/article";
import { MongoLogErrorRepositore } from "../../../infra/db/mongodb/article-repositore/log-error.repositore";

export function logErrorDecoratorFactor(articleController: IArticleController): LogArticleDecorator {
    const logErrorRepositore = new MongoLogErrorRepositore()
    return new LogArticleDecorator(articleController, logErrorRepositore)
}