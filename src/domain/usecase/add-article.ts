import { IArticle } from "../models/article";
export interface IArticleRequest {
  title: string;
  img: string;
  article: string;
}
export interface IAddArticle {
  add(article: IArticleRequest): Promise<IArticle>;
}
