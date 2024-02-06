import { ArticleController } from "@/controllers/article/article";
import { articleData } from "../mocks/article-data";
import { IControllers } from "@/controllers/protocols";
import { ParamError } from "@/controllers/errors/params-errors";

describe("./src/controllers/article", () => {
  interface IMakeSut {
    article: IControllers;
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
});
