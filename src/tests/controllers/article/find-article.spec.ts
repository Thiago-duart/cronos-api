import { FindArticleController } from "@/controllers/article/find-article";
import { ServerError } from "@/controllers/errors/server-error";
import { IArticle } from "@/domain/models/article";
import { IFindArticle } from "@/domain/usecase/article-usecases";

describe("", () => {
  interface IMakeSut {
    sut: FindArticleController;
    findArticleStub: IFindArticle;
  }
  function makeSut(): IMakeSut {
    class FindArticleStub implements IFindArticle {
      async find(): Promise<IArticle[]> {
        return [
          {
            id: "valid-id",
            img: "valid-img",
            title: "valid-title",
            article: "valid-article",
          },
        ];
      }
    }
    const findArticleStub = new FindArticleStub();
    const sut = new FindArticleController(findArticleStub);
    return { sut, findArticleStub };
  }
  test("should return 200 and an array IArticle", async () => {
    const { sut } = makeSut();
    const response = await sut.handle();
    const expectResponse = {
      id: "valid-id",
      img: "valid-img",
      title: "valid-title",
      article: "valid-article",
    };
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([expectResponse]);
  });
  test("should call addArticle with corretly data", async () => {
    const { sut, findArticleStub } = makeSut();
    const findSpy = jest.spyOn(findArticleStub, "find");
    await sut.handle();
    expect(findSpy).toHaveBeenCalled();
  });
});
