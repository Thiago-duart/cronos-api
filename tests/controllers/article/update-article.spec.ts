import { ParamError } from "@/controllers/errors/params-errors";
import { ServerError } from "@/controllers/errors/server-error";
import { makeSut } from "./makeSut";
describe("src/controller/article/finId-article", () => {
  test("should return 200 and updated article --- method update", async () => {
    const { sut, articleMethodsStub } = makeSut();
    jest
      .spyOn(articleMethodsStub, "update")
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
    const response = await sut.update({
      body: { title: "update-title" },
      params: { id: "valid-id" }
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expectResponse);
  });
  test("should call updateArticle with corretly data --- method update", async () => {
    const { sut, articleMethodsStub } = makeSut();
    const findIdSpy = jest.spyOn(articleMethodsStub, "update");
    await sut.update({ body: { title: "valid-title" }, params: { id: "valid-id" } });
    expect(findIdSpy).toHaveBeenCalled();
  });
  test("should return 500 if receive an unexpected error --- method update", async () => {
    const { sut, articleMethodsStub } = makeSut();
    jest
      .spyOn(articleMethodsStub, "update")
      .mockImplementationOnce(async (): Promise<any> => {
        throw new Error();
      });
    const response = await sut.update({
      body: { title: "valid-title" }, params: { id: "valid-id" }
    });
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError("fake"));
  });
  test("should return paramError missing param --- method update", async () => {
    const { sut } = makeSut();
    const response = await sut.update({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new ParamError("missing: id"));
  });
});
