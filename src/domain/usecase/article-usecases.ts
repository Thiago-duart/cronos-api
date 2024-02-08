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
export interface IAddArticle {
  add(article: IArticleRequest): Promise<IArticle>;
}

export interface IFindArticle {
  find(): Promise<IArticle[]>;
}

export interface IFindIdArticle {
  findId(id: string): Promise<IArticle>;
}

export interface IUpdateArticle {
  update(id: string, article: IArticleUpdateRequest): Promise<IArticle>;
}

export interface IDeleteArticle {
  delete(): Promise<boolean>;
}
