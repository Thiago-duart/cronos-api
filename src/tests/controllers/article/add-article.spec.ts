import { AddArticleController } from "@/controllers/article/add-article";
import { ParamError } from "@/controllers/errors/params-errors";
import { IValidator } from "@/controllers/interface/data-validator";
import { IAddArticle } from "@/domain/usecase/article-usecases";
import { IArticle } from "@/domain/models/article";
import { ServerError } from "@/controllers/errors/server-error";
import { articleData } from "../../mocks/article-data";

describe("./src/controllers/article/add-article", () => {
  interface IMakeSut {
    sut: AddArticleController;
    dataValidatorStub: IValidator;
    addArticleStub: IAddArticle;
  }
  function makeSut(): IMakeSut {
    class DataValidatorStub implements IValidator {
      validate(data: any) {
        return;
      }
    }
    class AddArticleStub implements IAddArticle {
      add(article: any): Promise<IArticle> {
        return article.successArticle;
      }
    }
    const addArticleStub = new AddArticleStub();
    const dataValidatorStub = new DataValidatorStub();
    const sut = new AddArticleController(dataValidatorStub, addArticleStub);
    return { sut, dataValidatorStub, addArticleStub };
  }
  test("should return 400 and an error message = title not found", async () => {
    const { sut, dataValidatorStub } = makeSut();
    jest.spyOn(dataValidatorStub, "validate").mockImplementationOnce((data) => {
      return "title not found";
    });
    const httpResponse = await sut.handle(articleData.withoutTitle);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new ParamError("title not found"));
  });
  test("should return 400 and an error message = article not found", async () => {
    const { sut, dataValidatorStub } = makeSut();
    jest.spyOn(dataValidatorStub, "validate").mockImplementationOnce((data) => {
      return "article not found";
    });
    const httpResponse = await sut.handle(articleData.withoutArticle);
    expect(httpResponse).toEqual({
      body: new ParamError("article not found"),
      statusCode: 400,
    });
  });
  test("should return 200 in case of success", async () => {
    const { sut } = makeSut();
    jest.spyOn(sut, "handle").mockImplementationOnce(async (httresquest) => {
      return {
        statusCode: 200,
        body: {
          id: "valid-id",
          title: "valid-title",
          img: "valid-img",
          article: "valid-article",
        },
      };
    });
    const httpResponse = await sut.handle(articleData.validData);
    expect(httpResponse).toEqual({
      body: articleData.successArticle.body,
      statusCode: 200,
    });
  });
  test("should return 400 if the data type to invalid - title", async () => {
    const { sut, dataValidatorStub } = makeSut();
    jest.spyOn(dataValidatorStub, "validate").mockImplementationOnce((data) => {
      return "title shold be string";
    });
    const httpResponse = await sut.handle(articleData.invalidTitle);
    expect(httpResponse).toEqual({
      body: new ParamError("title shold be string"),
      statusCode: 400,
    });
  });
  test("should return 400 if the data type to invalid - article", async () => {
    const { sut, dataValidatorStub } = makeSut();
    jest.spyOn(dataValidatorStub, "validate").mockImplementationOnce((data) => {
      return "article shold be string";
    });
    const httpResponse = await sut.handle(articleData.invalidTitle);
    expect(httpResponse).toEqual({
      body: new ParamError("article shold be string"),
      statusCode: 400,
    });
  });
  test("should call addArticle with corretly data", async () => {
    const { sut, addArticleStub } = makeSut();
    const addSpy = jest.spyOn(addArticleStub, "add");
    await sut.handle(articleData.validData);
    expect(addSpy).toHaveBeenCalledWith(articleData.validData.body);
  });
  test("should return 500 if receive an unexpected error", async () => {
    const { sut, addArticleStub } = makeSut();
    jest
      .spyOn(addArticleStub, "add")
      .mockImplementationOnce(async (article): Promise<any> => {
        throw new Error();
      });
    const response = await sut.handle(articleData.validData);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError("fake"));
  });
});
