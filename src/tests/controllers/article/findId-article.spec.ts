import { FindIdArticleController } from "@/controllers/article/findId-article";
import { ServerError } from "@/controllers/errors/server-error";
import { IArticle } from "@/domain/models/article";
import { IFindIdArticle } from "@/domain/usecase/article-usecases";

describe("src/controller/article/finId-article", () => {
  interface IMakeSut {
    sut: FindIdArticleController;
    findIdArticleStub: IFindIdArticle;
  }
  function makeSut(): IMakeSut {
    class FindIdArticleStub implements IFindIdArticle {
      async findId(): Promise<IArticle> {
        return {
          id: "valid-id",
          img: "valid-img",
          title: "valid-title",
          article: "valid-article",
        };
      }
    }
    const findIdArticleStub = new FindIdArticleStub();
    const sut = new FindIdArticleController(findIdArticleStub);
    return { sut, findIdArticleStub };
  }
  test("should return 200 and an array IArticle", async () => {
    const { sut } = makeSut();
    const response = await sut.handle({ body: { id: "valid-id" } });
    const expectResponse = {
      id: "valid-id",
      img: "valid-img",
      title: "valid-title",
      article: "valid-article",
    };
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expectResponse);
  });
  test("should call findIdArticle with corretly data", async () => {
    const { sut, findIdArticleStub } = makeSut();
    const findIdSpy = jest.spyOn(findIdArticleStub, "findId");
    await sut.handle({ body: { id: "valid-id" } });
    expect(findIdSpy).toHaveBeenCalled();
  });
  test("should return 500 if receive an unexpected error", async () => {
    const { sut, findIdArticleStub } = makeSut();
    jest
      .spyOn(findIdArticleStub, "findId")
      .mockImplementationOnce(async (): Promise<any> => {
        throw new Error();
      });
    const response = await sut.handle();
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError("fake"));
  });
});
