import {
  IArticleRepositore,
  IArticleRequest,
} from "@/data/interface/article-repositore";
import { DbAddArticle } from "@/data/usecases/db-article/db-add-article";
import { IArticle } from "@/domain/models/article";
import { IAddArticle } from "@/domain/usecase/article-usecases";
import { articleData } from "../../../mocks/article-data";

describe("./src/data/db-add-article", () => {
  interface IMakeSut {
    sut: IAddArticle;
    articleRepositoreStub: IArticleRepositore;
  }
  function makeSut(): IMakeSut {
    class ArticleRepositoreStub implements IArticleRepositore {
      async add(data: IArticleRequest): Promise<IArticle> {
        const fakeArticle = {
          id: "valid-id",
          title: "valid-title",
          img: "valid-img",
          article: "valid-article",
        };
        return fakeArticle;
      }
      find(): Promise<IArticle[]> {
        return;
      }
      findId(): Promise<IArticle> {
        return;
      }
      update(id: string, data: any): Promise<IArticle> {
        return;
      }
      delete(id: string): Promise<boolean> {
        return;
      }
    }
    const articleRepositoreStub = new ArticleRepositoreStub();
    const sut = new DbAddArticle(articleRepositoreStub);
    return { sut, articleRepositoreStub };
  }
  test("should call articleRepositore with corretly data", async () => {
    const { sut, articleRepositoreStub } = makeSut();
    const addSpy = jest.spyOn(articleRepositoreStub, "add");
    await sut.add(articleData.validData.body);
    expect(addSpy).toHaveBeenCalledWith(articleData.validData.body);
  });
  test("should return 201 in case of success", async () => {
    const { sut } = makeSut();
    const response = await sut.add(articleData.validData.body);
    expect(response).toEqual(articleData.successArticle.body);
  });
});
