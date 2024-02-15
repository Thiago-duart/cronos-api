import { articleData } from "../../../mocks/article-data";
import { makeSut } from "./makeSut";

describe("./src/data/db-add-article", () => {
  test("should call articleRepositore with corretly data --- method add", async () => {
    const { sut, articleRepositoreStub } = makeSut();
    const addSpy = jest.spyOn(articleRepositoreStub, "add");
    await sut.add(articleData.validData.body);
    expect(addSpy).toHaveBeenCalledWith(articleData.validData.body);
  });
  test("should return 201 in case of success --- method add", async () => {
    const { sut } = makeSut();
    const response = await sut.add(articleData.validData.body);
    expect(response).toEqual(articleData.successArticle.body);
  });
});
