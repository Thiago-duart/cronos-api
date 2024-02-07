import { IArticle } from "@/domain/models/article";
export interface IArticleRequest {
  title: string;
  article: string;
}
export interface IArticleRepositore {
  add(data: IArticleRequest): Promise<IArticle>;
}
