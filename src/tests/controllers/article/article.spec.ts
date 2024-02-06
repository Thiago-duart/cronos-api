import { ArticleController } from "@/controllers/article/article";
import { articleData } from "../mocks/article-data";
import { ParamError } from "@/controllers/errors/params-errors";
import { IValidator } from "@/controllers/interface/data-validator";

describe("./src/controllers/article", () => {
  interface IMakeSut {
    article: ArticleController;
    dataValidatorStub: IValidator;
  }
  function makeSut(): IMakeSut {
    class DataValidatorStub implements IValidator {
      validate(data: any) {
        return;
      }
    }
    const dataValidatorStub = new DataValidatorStub();
    const article = new ArticleController(dataValidatorStub);
    return { article, dataValidatorStub };
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
});
