import { IArticleRepositore } from "@/data/interface/article-repositore";
import { IArticle } from "@/domain/models/article";
import {
  IArticleUpdateRequest,
  IUpdateArticle,
} from "@/domain/usecase/article-usecases";

export class DbUpdateArticle implements IUpdateArticle {
  private readonly articleRepositore: IArticleRepositore;
  constructor(articleRepositore: IArticleRepositore) {
    this.articleRepositore = articleRepositore;
  }
  async update(id: string, data: IArticleUpdateRequest): Promise<IArticle> {
    const response = await this.articleRepositore.update(id, data);
    return response;
  }
}
