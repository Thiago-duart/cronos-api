import { ParamError,ServerError } from "@/controllers/errors";
import { articleData } from "../../mocks/article-data";
import { makeSut } from "./makeSut"
describe("./src/controllers/article/add-article", () => {
  test("should return 400 and an error message title not found --- method add", async () => {
    const { sut, validatorStub } = makeSut();
    jest.spyOn(validatorStub, "validate").mockImplementationOnce((data) => {
      return "title not found";
    });
    const httpResponse = await sut.add(articleData.withoutTitle);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new ParamError("title not found"));
  });
  test("should return 400 and an error message article not found --- method add", async () => {
    const { sut, validatorStub } = makeSut();
    jest.spyOn(validatorStub, "validate").mockImplementationOnce((data) => {
      return "article not found";
    });
    const httpResponse = await sut.add(articleData.withoutArticle);
    expect(httpResponse).toEqual({
      body: new ParamError("article not found"),
      statusCode: 400,
    });
  });
  test("should return 200 in case of success --- method add", async () => {
    const { sut } = makeSut();
    jest.spyOn(sut, "add").mockImplementationOnce(async (resquest) => {
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
    const httpResponse = await sut.add(articleData.validData);
    expect(httpResponse).toEqual({
      body: articleData.successArticle.body,
      statusCode: 200,
    });
  });
  test("should return 400 if the data type to invalid - title --- method add", async () => {
    const { sut, validatorStub } = makeSut();
    jest.spyOn(validatorStub, "validate").mockImplementationOnce((data) => {
      return "title shold be string";
    });
    const httpResponse = await sut.add(articleData.invalidTitle);
    expect(httpResponse).toEqual({
      body: new ParamError("title shold be string"),
      statusCode: 400,
    });
  });
  test("should return 400 if the data type to invalid - article --- method add", async () => {
    const { sut, validatorStub } = makeSut();
    jest.spyOn(validatorStub, "validate").mockImplementationOnce((data) => {
      return "article shold be string";
    });
    const httpResponse = await sut.add(articleData.invalidTitle);
    expect(httpResponse).toEqual({
      body: new ParamError("article shold be string"),
      statusCode: 400,
    });
  });
  test("should call addArticle with corretly data --- method add", async () => {
    const { sut, articleMethodsStub } = makeSut();
    const addSpy = jest.spyOn(articleMethodsStub, "add");
    await sut.add(articleData.validData);
    expect(addSpy).toHaveBeenCalledWith(articleData.validData.body);
  });
  test("should return 500 if receive an unexpected error --- method add", async () => {
    const { sut, articleMethodsStub } = makeSut();
    jest
      .spyOn(articleMethodsStub, "add")
      .mockImplementationOnce(async (article): Promise<any> => {
        throw new Error();
      });
    const response = await sut.add(articleData.validData);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError("fake"));
  });
});
