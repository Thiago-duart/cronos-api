import { IArticle } from "@/domain/models/article";
import { IArticleMethods, IArticleRequest, IArticleUpdateRequest } from "@/domain/usecase/article-usecase";
import { articleData } from "../../mocks/article-data";
import { ArticleController } from "@/controllers/article/article";
import { IValidator } from "@/controllers/interface";
interface IMakeSut {
  validatorStub: IValidator
  articleMethodsStub: IArticleMethods
  sut: ArticleController
}
export function makeSut(): IMakeSut {
  class ValidatorStub implements IValidator {
    addValidate(data: any) {
    }
    updateValidate(data: any) {
    }
  }
  class ArticleMethodsStub implements IArticleMethods {
    async add(article: IArticleRequest): Promise<IArticle> {
      return articleData.successArticle.body
    }
    async find(): Promise<IArticle[]> {
      return [articleData.successArticle.body]
    }
    async findId(id: string): Promise<IArticle> {
      return articleData.successArticle.body
    }
    async update(id: string, article: IArticleUpdateRequest): Promise<IArticle> {
      return articleData.successArticle.body
    }
    async delete(id: string): Promise<boolean> {
      return true
    }
  }
  const validatorStub = new ValidatorStub()
  const articleMethodsStub = new ArticleMethodsStub()
  const sut = new ArticleController(articleMethodsStub, validatorStub)
  return { sut, validatorStub, articleMethodsStub };
}