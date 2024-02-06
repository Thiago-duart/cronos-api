import { ParamError } from "../errors/params-errors";
import { IControllers, IHttpRequest, IHttpResponse } from "../protocols";
import { aricleValidate } from "../validateData/articleData";

export class ArticleController implements IControllers {
  async handle(httresquest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const valid = aricleValidate(httresquest.body);
      if (valid) {
        return {
          body: new ParamError(valid),
          statusCode: 400,
        };
      }
      return;
    } catch (error) {
      console.log(error);
    }
  }
}
