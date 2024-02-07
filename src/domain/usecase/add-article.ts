import { IArticle } from "../models/article";
export interface IArticleRequest {
  title: string;
  article: string;
}
export interface IAddArticle {
  add(article: IArticleRequest): Promise<IArticle>;
}
