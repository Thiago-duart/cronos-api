import { IArticle } from "../models/article";
export interface IArticleRequest {
  title: string;
  img: string;
  article: string;
}
export interface IArticleUpdateRequest {
  title?: string;
  img?: string;
  article?: string;
}
export interface IArticleMethods {
  add(article: IArticleRequest): Promise<IArticle>;
  find(): Promise<IArticle[]>;
  findId(id: string): Promise<IArticle>;
  update(id: string, article: IArticleUpdateRequest): Promise<IArticle>;
  delete(id: string): Promise<boolean>;
}
