import { ParamError } from "../errors/params-errors";
import { badRequest } from "../helpers/http-response";
import { IControllers, IHttpRequest, IHttpResponse } from "../interface";
import { IValidator } from "../interface/data-validator";

export class ArticleController implements IControllers {
  private readonly datavalidator: IValidator;
  constructor(datavalidator: IValidator) {
    this.datavalidator = datavalidator;
  }
  async handle(httresquest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const isValid: string | null = this.datavalidator.validate(
        httresquest.body
      );
      if (isValid) {
        return badRequest(new ParamError(isValid));
      }
      return;
    } catch (error) {
      console.log(error);
    }
  }
}
