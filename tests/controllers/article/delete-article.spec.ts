import { ServerError } from "@/controllers/errors/server-error";
import { makeSut } from "./makeSut";
describe("src/controller/article/delete-article", () => {
  test("should return 204 no content --- method delete", async () => {
    const { sut } = makeSut();
    const response = await sut.delete({ params: { id: "valid-id" } });
    expect(response.statusCode).toBe(204);
  });
  test("should call deleteArticle with corretly data --- method delete", async () => {
    const { sut, articleMethodsStub } = makeSut();
    const deleteSpy = jest.spyOn(articleMethodsStub, "delete");
    await sut.delete({ params: { id: "valid-id" } });
    expect(deleteSpy).toHaveBeenCalledWith({ id: "valid-id" });
  });
  test("should return require id  --- method delete", async () => {
    const { sut } = makeSut();
    const response = await sut.delete({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: { id: "Required" } });
  });
  test("should return 500 if receive an unexpected error --- method delete", async () => {
    const { sut, articleMethodsStub } = makeSut();
    jest
      .spyOn(articleMethodsStub, "delete")
      .mockImplementationOnce(async (): Promise<any> => {
        throw new Error();
      });
    const response = await sut.delete({ params: { id: "valid-id" } });
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError("fake"));
  });
});
