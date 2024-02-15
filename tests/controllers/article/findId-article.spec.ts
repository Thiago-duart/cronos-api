import { ParamError } from "@/controllers/errors/params-errors";
import { ServerError } from "@/controllers/errors/server-error";
import { makeSut } from "./makeSut";
describe("src/controller/article/finId-article", () => {
    test("should return 200 and an array IArticle --- method findId", async () => {
    const { sut } = makeSut();
    const response = await sut.findId({ body: { id: "valid-id" } });
    const expectResponse = {
      id: "valid-id",
      img: "valid-img",
      title: "valid-title",
      article: "valid-article",
    };
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expectResponse);
  });
  test("should call findIdArticle with corretly data --- method findId", async () => {
    const { sut, articleMethodsStub } = makeSut();
    const findIdSpy = jest.spyOn(articleMethodsStub, "findId");
    await sut.findId({ body: { id: "valid-id" } });
    expect(findIdSpy).toHaveBeenCalled();
  });
  test("should return paramError missing param --- method findId", async () => {
    const { sut } = makeSut();
    const response = await sut.findId({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new ParamError("missing: id"));
  });
  test("should return 500 if receive an unexpected error --- method findId", async () => {
    const { sut, articleMethodsStub } = makeSut();
    jest
      .spyOn(articleMethodsStub, "findId")
      .mockImplementationOnce(async (): Promise<any> => {
        throw new Error();
      });
    const response = await sut.findId({ body: { id: "valid-id" } });
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError("fake"));
  });
});
