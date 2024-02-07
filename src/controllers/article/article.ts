import { IAddArticle } from "@/domain/usecase/add-article";
import { ParamError } from "../errors/params-errors";
import { badRequest, serverError } from "../helpers/http-response";
import { IControllers, IHttpRequest, IHttpResponse } from "../interface";
import { IValidator } from "../interface/data-validator";
import { ServerError } from "../errors/server-error";

export class ArticleController implements IControllers {
  private readonly datavalidator: IValidator;
  private readonly addArticle: IAddArticle;
  constructor(datavalidator: IValidator, addArticle: IAddArticle) {
    this.datavalidator = datavalidator;
    this.addArticle = addArticle;
  }
  async handle(httresquest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const isValid: string | null = this.datavalidator.validate(
        httresquest.body
      );
      if (isValid) {
        return badRequest(new ParamError(isValid));
      }

      const response = await this.addArticle.add(httresquest.body);
      return;
    } catch (error) {
      return serverError(new ServerError(error.stack));
    }
  }
}
