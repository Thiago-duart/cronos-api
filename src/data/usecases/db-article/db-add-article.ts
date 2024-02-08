import { IArticleRepositore } from "@/data/interface/article-repositore";
import { IArticle } from "@/domain/models/article";
import {
  IAddArticle,
  IArticleRequest,
} from "@/domain/usecase/article-usecases";

export class DbAddArticle implements IAddArticle {
  private readonly articleRepositore: IArticleRepositore;
  constructor(articleRepositore: IArticleRepositore) {
    this.articleRepositore = articleRepositore;
  }
  async add(article: IArticleRequest): Promise<IArticle> {
    const response = await this.articleRepositore.add(article);
    return response;
  }
}
