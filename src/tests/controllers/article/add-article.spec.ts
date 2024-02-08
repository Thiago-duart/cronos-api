import { AddArticleController } from "@/controllers/article/add-article";
import { ParamError } from "@/controllers/errors/params-errors";
import { IValidator } from "@/controllers/interface/data-validator";
import { IAddArticle } from "@/domain/usecase/add-article";
import { IArticle } from "@/domain/models/article";
import { ServerError } from "@/controllers/errors/server-error";
import { articleData } from "../../mocks/article-data";

describe("./src/controllers/article", () => {
  interface IMakeSut {
    article: AddArticleController;
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
    const article = new AddArticleController(dataValidatorStub, addArticleStub);
    return { article, dataValidatorStub, addArticleStub };
  }
  test("should return 400 and an error message = title not found", async () => {
    const { article, dataValidatorStub } = makeSut();
    jest.spyOn(dataValidatorStub, "validate").mockImplementationOnce((data) => {
      return "title not found";
    });
    const httpResponse = await article.handle(articleData.withoutTitle);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new ParamError("title not found"));
  });
  test("should return 400 and an error message = article not found", async () => {
    const { article, dataValidatorStub } = makeSut();
    jest.spyOn(dataValidatorStub, "validate").mockImplementationOnce((data) => {
      return "article not found";
    });
    const httpResponse = await article.handle(articleData.withoutArticle);
    expect(httpResponse).toEqual({
      body: new ParamError("article not found"),
      statusCode: 400,
    });
  });
  test("should return 200 in case of success", async () => {
    const { article } = makeSut();
    jest
      .spyOn(article, "handle")
      .mockImplementationOnce(async (httresquest) => {
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
    const httpResponse = await article.handle(articleData.validData);
    expect(httpResponse).toEqual({
      body: articleData.successArticle.body,
      statusCode: 200,
    });
  });
  test("should return 400 if the data type to invalid - title", async () => {
    const { article, dataValidatorStub } = makeSut();
    jest.spyOn(dataValidatorStub, "validate").mockImplementationOnce((data) => {
      return "title shold be string";
    });
    const httpResponse = await article.handle(articleData.invalidTitle);
    expect(httpResponse).toEqual({
      body: new ParamError("title shold be string"),
      statusCode: 400,
    });
  });
  test("should return 400 if the data type to invalid - article", async () => {
    const { article, dataValidatorStub } = makeSut();
    jest.spyOn(dataValidatorStub, "validate").mockImplementationOnce((data) => {
      return "article shold be string";
    });
    const httpResponse = await article.handle(articleData.invalidTitle);
    expect(httpResponse).toEqual({
      body: new ParamError("article shold be string"),
      statusCode: 400,
    });
  });
  test("should call addArticle with corretly data", async () => {
    const { article, addArticleStub } = makeSut();
    const addSpy = jest.spyOn(addArticleStub, "add");
    await article.handle(articleData.validData);
    expect(addSpy).toHaveBeenCalledWith(articleData.validData.body);
  });
  test("should return 500 if receive an unexpected error", async () => {
    const { article, addArticleStub } = makeSut();
    jest
      .spyOn(addArticleStub, "add")
      .mockImplementationOnce(async (article): Promise<any> => {
        throw new Error();
      });
    const response = await article.handle(articleData.validData);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError("fake"));
  });
});
