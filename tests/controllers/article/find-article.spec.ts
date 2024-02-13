import { ServerError } from "@/controllers/errors/server-error";
import { makeSut } from "./makeSut";
describe("src/controller/article/findId-article", () => {
    test("should return 200 and an array IArticle --- method find", async () => {
    const { sut } = makeSut();
    const response = await sut.find();
    const expectResponse = {
      id: "valid-id",
      img: "valid-img",
      title: "valid-title",
      article: "valid-article",
    };
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([expectResponse]);
  });
  test("should call findArticle with corretly data --- method find", async () => {
    const { sut, articleMethodsStub } = makeSut();
    const findSpy = jest.spyOn(articleMethodsStub, "find");
    await sut.find();
    expect(findSpy).toHaveBeenCalled();
  });
  test("should return 500 if receive an unexpected error --- method find", async () => {
    const { sut, articleMethodsStub } = makeSut();
    jest
      .spyOn(articleMethodsStub, "find")
      .mockImplementationOnce(async (): Promise<any> => {
        throw new Error();
      });
    const response = await sut.find();
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError("fake"));
  });
});
