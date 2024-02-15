import { IArticleMethods } from "@/controllers/article";
import { IArticleRepositore } from "@/data/interface/article.repositore";
import { IArticle } from "@/domain/models/article";
import { IArticleRequest, IArticleUpdateRequest } from "@/domain/usecase/article-usecase";

export class DbArticle implements IArticleMethods {
    private readonly articleRepositore: IArticleRepositore;
    constructor(articleRepositore: IArticleRepositore) {
        this.articleRepositore = articleRepositore;
    }
    async add(article: IArticleRequest): Promise<IArticle> {
        const articleResponse = await this.articleRepositore.add(article)
        return articleResponse
    }
    async find(): Promise<IArticle[]> {
        const articlesResponse = await this.articleRepositore.find()
        return articlesResponse
    }
    async findId(id: string): Promise<IArticle> {
        const articleResponse = await this.articleRepositore.findId(id)
        return articleResponse
    }
    async update(id: string, article: IArticleUpdateRequest): Promise<IArticle> {
        const articleResponse = await this.articleRepositore.update(id, article)
        return articleResponse
    }
    async delete(id: string): Promise<boolean> {
        const response = await this.articleRepositore.delete(id)
        return response
    }
}