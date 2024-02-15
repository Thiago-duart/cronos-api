import { IArticle } from "@/domain/models/article";
export interface IArticleRequest {
  title: string;
  img: string;
  article: string;
}
export interface IUpdateArticleRequest {
  id?: string;
  img?: string;
  title?: string;
  article?: string;
}
export interface IArticleRepositore {
  add(data: IArticleRequest): Promise<IArticle>;
  find(): Promise<IArticle[]>;
  findId(id: string): Promise<IArticle>;
  update(id: string, data: IUpdateArticleRequest): Promise<IArticle>;
  delete(id: string): Promise<boolean>;
}
