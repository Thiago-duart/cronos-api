import { articleData } from "../../../mocks/article-data";
import { makeSut } from "./makeSut";
describe("./src/data/db-add-article", () => {
  test("should call articleRepositore --- method findId", async () => {
    const { sut, articleRepositoreStub } = makeSut();
    const findIdSpy = jest.spyOn(articleRepositoreStub, "findId");
    await sut.findId("any-id");
    expect(findIdSpy).toHaveBeenCalledWith("any-id");
  });
  test("should return object array in case success --- method findId", async () => {
    const { sut } = makeSut();
    const response = await sut.findId("any-id");
    expect(response).toEqual(articleData.successArticle.body);
  });
});
