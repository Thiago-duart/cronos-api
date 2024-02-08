import {
  IArticleRepositore,
  IArticleRequest,
  IUpdateArticle,
} from "@/data/interface/article-repositore";
import { DbAddArticle } from "@/data/usecases/db-add-article/db-add-article";
import { IArticle } from "@/domain/models/article";
import { IAddArticle } from "@/domain/usecase/add-article";
import { articleData } from "../../mocks/article-data";

describe("./src/data/db-add-article", () => {
  interface IMakeSut {
    dbAddArticle: IAddArticle;
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
      get(): Promise<IArticle[]> {
        return;
      }
      getId(): Promise<IArticle> {
        return;
      }
      update(id: string, data: IUpdateArticle): Promise<IArticle> {
        return;
      }
      delete(id: string): Promise<boolean> {
        return;
      }
    }
    const articleRepositoreStub = new ArticleRepositoreStub();
    const dbAddArticle = new DbAddArticle(articleRepositoreStub);
    return { dbAddArticle, articleRepositoreStub };
  }
  test("should call articleRepositore with corretly data", async () => {
    const { dbAddArticle, articleRepositoreStub } = makeSut();
    const addSpy = jest.spyOn(articleRepositoreStub, "add");
    await dbAddArticle.add(articleData.validData.body);
    expect(addSpy).toHaveBeenCalledWith(articleData.validData.body);
  });
  test("should return 201 in case of success", async () => {
    const { dbAddArticle } = makeSut();
    const response = await dbAddArticle.add(articleData.validData.body);
    expect(response).toEqual(articleData.successArticle.body);
  });
});
