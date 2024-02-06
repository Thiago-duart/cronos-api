import { ArticleController } from "@/controllers/article/article";
import { articleData } from "../mocks/article-data";
import { ParamError } from "@/controllers/errors/params-errors";

describe("./src/controllers/article", () => {
  interface IMakeSut {
    article: ArticleController;
  }
  function makeSut(): IMakeSut {
    const article = new ArticleController();
    return { article };
  }
  test("should return 400 and an error message = title not found", async () => {
    const { article } = makeSut();
    const httpResponse = await article.handle(articleData.withoutTitle);
    expect(httpResponse).toEqual({
      body: new ParamError("title not found"),
      statusCode: 400,
    });
  });
  test("should return 400 and an error message = article not found", async () => {
    const { article } = makeSut();
    const httpResponse = await article.handle(articleData.withoutArticle);
    expect(httpResponse).toEqual({
      body: new ParamError("article not found"),
      statusCode: 400,
    });
  });
  test("should return 200 in case of success", async () => {
    const { article } = makeSut();
    jest
      .spyOn(article, "handle")
      .mockImplementationOnce(async (httresquest) => {
        return {
          statusCode: 200,
          body: {
            id: "valid-id",
            title: "valid-title",
            article: "valid-article",
          },
        };
      });
    const httpResponse = await article.handle(articleData.validData);
    expect(httpResponse).toEqual({
      body: articleData.successArticle.body,
      statusCode: 200,
    });
  });
});
