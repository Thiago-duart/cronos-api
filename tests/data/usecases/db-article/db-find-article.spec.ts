import { articleData } from "../../../mocks/article-data";
import { makeSut } from "./makeSut";
describe("./src/data/db-add-article", () => {
  test("should call articleRepositore --- method find", async () => {
    const { sut, articleRepositoreStub } = makeSut();
    const findSpy = jest.spyOn(articleRepositoreStub, "find");
    await sut.find();
    expect(findSpy).toHaveBeenCalled();
  });
  test("should return object array in case success --- method find", async () => {
    const { sut } = makeSut();
    const response = await sut.find();
    expect(response).toEqual([articleData.successArticle.body]);
  });
});
