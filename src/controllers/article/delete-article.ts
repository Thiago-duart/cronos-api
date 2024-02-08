import { IDeleteArticle } from "@/domain/usecase/article-usecases";
import { ServerError } from "../errors/server-error";
import { badRequest, noContent, serverError } from "../helpers/http-response";
import { IControllers, IHttpRequest, IHttpResponse } from "../interface";
import { ParamError } from "../errors/params-errors";

export class DeleteArticleController implements IControllers {
  private readonly deleteArticle: IDeleteArticle;
  constructor(deleteArticle: IDeleteArticle) {
    this.deleteArticle = deleteArticle;
  }
  async handle(httresquest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { id } = httresquest?.body || false;
      if (!id) {
        return badRequest(new ParamError("missing: id"));
      }
      await this.deleteArticle.delete(id);
      return noContent();
    } catch (error) {
      return serverError(new ServerError(error.stack));
    }
  }
}
