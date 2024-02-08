import { IFindIdArticle } from "@/domain/usecase/article-usecases";
import { ServerError } from "../errors/server-error";
import { badRequest, ok, serverError } from "../helpers/http-response";
import { IControllers, IHttpRequest, IHttpResponse } from "../interface";
import { ParamError } from "../errors/params-errors";

export class FindIdArticleController implements IControllers {
  private readonly findIdArticle: IFindIdArticle;
  constructor(findIdArticle: IFindIdArticle) {
    this.findIdArticle = findIdArticle;
  }
  async handle(httresquest?: IHttpRequest): Promise<IHttpResponse> {
    try {
      const id = httresquest?.body?.id || false;
      if (!id) {
        return badRequest(new ParamError("missing: id"));
      }
      const response = await this.findIdArticle.findId(id);
      return ok(response);
    } catch (error) {
      return serverError(new ServerError(error.stack));
    }
  }
}
