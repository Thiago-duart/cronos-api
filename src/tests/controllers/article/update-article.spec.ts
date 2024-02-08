import { UpdateArticleController } from "@/controllers/article/update-article";
import { ParamError } from "@/controllers/errors/params-errors";
import { ServerError } from "@/controllers/errors/server-error";
import { IArticle } from "@/domain/models/article";
import { IUpdateArticle } from "@/domain/usecase/article-usecases";

describe("src/controller/article/finId-article", () => {
  interface IMakeSut {
    sut: UpdateArticleController;
    updateArticleStub: IUpdateArticle;
  }
  function makeSut(): IMakeSut {
    class UpdateArticleStub implements IUpdateArticle {
      async update(): Promise<IArticle> {
        return {
          id: "valid-id",
          img: "valid-img",
          title: "valid-title",
          article: "valid-article",
        };
      }
    }
    const updateArticleStub = new UpdateArticleStub();
    const sut = new UpdateArticleController(updateArticleStub);
    return { sut, updateArticleStub };
  }
  test("should return 200 and updated article", async () => {
    const { sut, updateArticleStub } = makeSut();
    jest
      .spyOn(updateArticleStub, "update")
      .mockImplementationOnce(
        async (id: string, article: any): Promise<any> => {
          return {
            id: "valid-id",
            img: "valid-img",
            title: "update-title",
            article: "valid-article",
          };
        }
      );
    const expectResponse = {
      id: "valid-id",
      img: "valid-img",
      title: "update-title",
      article: "valid-article",
    };
    const response = await sut.handle({
      body: { id: "valid-id", title: "update-title" },
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expectResponse);
  });
  test("should call updateArticle with corretly data", async () => {
    const { sut, updateArticleStub } = makeSut();
    const findIdSpy = jest.spyOn(updateArticleStub, "update");
    await sut.handle({ body: { id: "valid-id", title: "valid-title" } });
    expect(findIdSpy).toHaveBeenCalled();
  });
  test("should return 500 if receive an unexpected error", async () => {
    const { sut, updateArticleStub } = makeSut();
    jest
      .spyOn(updateArticleStub, "update")
      .mockImplementationOnce(async (): Promise<any> => {
        throw new Error();
      });
    const response = await sut.handle({
      body: { id: "valid-id", title: "valid-title" },
    });
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError("fake"));
  });
  test("should return paramError missing param", async () => {
    const { sut } = makeSut();
    const response = await sut.handle({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new ParamError("missing: id"));
  });
});
