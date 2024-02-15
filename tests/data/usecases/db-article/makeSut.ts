import { IArticleRepositore } from "@/data/interface/article-repositore"
import { DbArticle } from "@/data/usecases/article/db-article"
import { IArticleRequest, IArticleUpdateRequest } from "@/domain/usecase/article-usecase"
import { IArticle } from "@/domain/models/article"
import { articleData } from "../../../mocks/article-data"

interface IMakeSut{
    sut: DbArticle, 
    articleRepositoreStub: IArticleRepositore
  }
export function makeSut(): IMakeSut {
      class ArticleRepositoreStub implements IArticleRepositore {
        async add(article: IArticleRequest): Promise<IArticle> {
          return articleData.successArticle.body
      }
      async  find(): Promise<IArticle[]> {
          return [articleData.successArticle.body]
      }
      async findId(id: string): Promise<IArticle> {
          return articleData.successArticle.body
      }
      async  update(id: string, article: IArticleUpdateRequest): Promise<IArticle> {
          return articleData.successArticle.body
      }
      async delete(id: string): Promise<boolean> {
          return true
      }
      }
      const articleRepositoreStub = new ArticleRepositoreStub();
      const sut = new DbArticle(articleRepositoreStub);
      return { sut, articleRepositoreStub };
    }