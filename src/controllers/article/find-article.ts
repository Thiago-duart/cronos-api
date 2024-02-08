import { IFindArticle } from "@/domain/usecase/article-usecases";
import { ServerError } from "../errors/server-error";
import { ok, serverError } from "../helpers/http-response";
import { IControllers, IHttpResponse } from "../interface";

export class FindArticleController implements IControllers {
  private readonly findArticle: IFindArticle;
  constructor(findArticle: IFindArticle) {
    this.findArticle = findArticle;
  }
  async handle(): Promise<IHttpResponse> {
    try {
      const response = await this.findArticle.find();
      return ok(response);
    } catch (error) {
      return serverError(new ServerError(error.stack));
    }
  }
}
