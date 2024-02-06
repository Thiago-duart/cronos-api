import { IArticle } from "../models/article";
interface IArticleRequest {
  title: string;
  text: string;
}
export interface IAddArticle {
  add(article: IArticleRequest): Promise<IArticle>;
}
