import { IArticleRepositore } from "@/data/interface/article-repositore";
import { IArticle } from "@/domain/models/article";
import { IFindArticle } from "@/domain/usecase/article-usecases";

export class DbFindArticle implements IFindArticle {
  private readonly articleRepositore: IArticleRepositore;
  constructor(articleRepositore: IArticleRepositore) {
    this.articleRepositore = articleRepositore;
  }
  async find(): Promise<IArticle[]> {
    const response = await this.articleRepositore.find();
    return response;
  }
}
