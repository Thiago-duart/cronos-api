import {
  IArticleRepositore,
  IArticleRequest,
  IUpdateArticle,
} from "@/data/interface/article-repositore";
import { IArticle } from "@/domain/models/article";
import { IFindArticle } from "@/domain/usecase/article-usecases";
import { articleData } from "../../../mocks/article-data";
import { DbFindArticle } from "@/data/usecases/db-article/db-find-article";

describe("./src/data/db-add-article", () => {
  interface IMakeSut {
    sut: IFindArticle;
    articleRepositoreStub: IArticleRepositore;
  }
  function makeSut(): IMakeSut {
    class ArticleRepositoreStub implements IArticleRepositore {
      async add(data: IArticleRequest): Promise<IArticle> {
        return;
      }
      async find(): Promise<IArticle[]> {
        const fakeArticle = [
          {
            id: "valid-id",
            title: "valid-title",
            img: "valid-img",
            article: "valid-article",
          },
        ];
        return fakeArticle;
      }
      findId(): Promise<IArticle> {
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
    const sut = new DbFindArticle(articleRepositoreStub);
    return { sut, articleRepositoreStub };
  }
  test("should call articleRepositore", async () => {
    const { sut, articleRepositoreStub } = makeSut();
    const findSpy = jest.spyOn(articleRepositoreStub, "find");
    await sut.find();
    expect(findSpy).toHaveBeenCalled();
  });
  test("should return object array in case success", async () => {
    const { sut } = makeSut();
    const response = await sut.find();
    expect(response).toEqual([articleData.successArticle.body]);
  });
});
