import { IArticleRepositore } from "@/data/interface/article.repositore";
import { IMiddleware } from "../interface/middlewares";
import { IHttpResponse } from "../interface";
import { notFound, ok } from "../helpers/http-response";

export class ArticleIdExistsMiddleware implements IMiddleware {
    private readonly articleRepositore: IArticleRepositore
    constructor(articleRepositore: IArticleRepositore) {
        this.articleRepositore = articleRepositore
    }
    async handle(request: any): Promise<IHttpResponse> {
        const id = request?.id || false
        const article = await this.articleRepositore.findId(id)
        if (!article) {
            return notFound({ id: "id not found" })
        }
        return ok("next")
    }
}