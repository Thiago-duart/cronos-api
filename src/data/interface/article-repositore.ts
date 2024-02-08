import { IArticle } from "@/domain/models/article";
export interface IArticleRequest {
  title: string;
  img: string;
  article: string;
}
export interface IUpdateArticle {
  id?: string;
  img?: string;
  title?: string;
  article?: string;
}
export interface IArticleRepositore {
  add(data: IArticleRequest): Promise<IArticle>;
  get(): Promise<IArticle[]>;
  getId(id: string): Promise<IArticle>;
  update(id: string, data: IUpdateArticle): Promise<IArticle>;
  delete(id: string): Promise<void>;
}
