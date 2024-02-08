import { DeleteArticleController } from "@/controllers/article/delete-article";
import { ParamError } from "@/controllers/errors/params-errors";
import { ServerError } from "@/controllers/errors/server-error";
import { IDeleteArticle } from "@/domain/usecase/article-usecases";

describe("src/controller/article/finId-article", () => {
  interface IMakeSut {
    sut: DeleteArticleController;
    deleteArticleStub: IDeleteArticle;
  }
  function makeSut(): IMakeSut {
    class DeleteArticleStub implements IDeleteArticle {
      async delete(id: string): Promise<boolean> {
        return true;
      }
    }
    const deleteArticleStub = new DeleteArticleStub();
    const sut = new DeleteArticleController(deleteArticleStub);
    return { sut, deleteArticleStub };
  }
  test("should return 204 no content", async () => {
    const { sut } = makeSut();
    const response = await sut.handle({ body: { id: "valid-id" } });
    expect(response.statusCode).toBe(204);
  });
  test("should call deleteArticle with corretly data", async () => {
    const { sut, deleteArticleStub } = makeSut();
    const deleteSpy = jest.spyOn(deleteArticleStub, "delete");
    await sut.handle({ body: { id: "valid-id" } });
    expect(deleteSpy).toHaveBeenCalledWith("valid-id");
  });
  test("should return paramError missing param", async () => {
    const { sut } = makeSut();
    const response = await sut.handle({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new ParamError("missing: id"));
  });
  test("should return 500 if receive an unexpected error", async () => {
    const { sut, deleteArticleStub } = makeSut();
    jest
      .spyOn(deleteArticleStub, "delete")
      .mockImplementationOnce(async (): Promise<any> => {
        throw new Error();
      });
    const response = await sut.handle({ body: { id: "valid-id" } });
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new ServerError("fake"));
  });
});
