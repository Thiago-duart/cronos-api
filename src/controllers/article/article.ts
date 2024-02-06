import { ParamError } from "../errors/params-errors";
import { badRequest } from "../helpers/httpResponse";
import { IControllers, IHttpRequest, IHttpResponse } from "../protocols";
import { IValidator } from "../protocols/validationData";

export class ArticleController implements IControllers {
  private readonly datavalidator: IValidator;
  constructor(datavalidator: IValidator) {
    this.datavalidator = datavalidator;
  }
  async handle(httresquest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const valid = this.datavalidator.validate(httresquest.body);
      if (valid) {
        return badRequest(new ParamError(valid));
      }
      return;
    } catch (error) {
      console.log(error);
    }
  }
}
