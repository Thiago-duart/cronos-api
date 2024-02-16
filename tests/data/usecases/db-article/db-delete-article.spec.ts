import { makeSut } from "./makeSut";
describe("./src/data/db-add-article", () => {
  test("should call articleRepositore --- method delete", async () => {
    const { sut, articleRepositoreStub } = makeSut();
    const deleteSpy = jest.spyOn(articleRepositoreStub, "delete");
    await sut.delete("any-id");
    expect(deleteSpy).toHaveBeenCalledWith("any-id");
  });
  test("should return object array in case success --- method delete", async () => {
    const { sut } = makeSut();
    const response = await sut.delete("any-id");
    expect(response).toEqual(true);
  });
});
