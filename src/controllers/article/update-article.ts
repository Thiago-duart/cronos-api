import { IUpdateArticle } from "@/domain/usecase/article-usecases";
import { ServerError } from "../errors/server-error";
import { badRequest, ok, serverError } from "../helpers/http-response";
import { IControllers, IHttpRequest, IHttpResponse } from "../interface";
import { ParamError } from "../errors/params-errors";

export class UpdateArticleController implements IControllers {
  private readonly updateArticle: IUpdateArticle;
  constructor(updateArticle: IUpdateArticle) {
    this.updateArticle = updateArticle;
  }
  async handle(httresquest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { id, ...data } = httresquest?.body || false;
      if (!id) {
        return badRequest(new ParamError("missing: id"));
      }
      const updated = await this.updateArticle.update(id, data);
      return ok(updated);
    } catch (error) {
      return serverError(new ServerError(error.stack));
    }
  }
}
