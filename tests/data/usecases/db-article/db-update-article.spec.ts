import { articleData } from "../../../mocks/article-data";
import { makeSut } from "./makeSut";
describe("./src/data/db-add-article", () => {
  test("should call articleRepositore --- method update", async () => {
    const { sut, articleRepositoreStub } = makeSut();
    const updateSpy = jest.spyOn(articleRepositoreStub, "update");
    await sut.update("any-id", { title: "update" });
    expect(updateSpy).toHaveBeenCalledWith("any-id", { title: "update" });
  });
  test("should return object array in case success --- method update", async () => {
    const { sut } = makeSut();
    const response = await sut.update("any-id", { title: "update-title" });
    expect(response).toEqual(articleData.successArticleUpdate.body);
  });
});
