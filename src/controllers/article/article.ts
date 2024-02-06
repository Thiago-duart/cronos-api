import { IControllers, IHttpRequest, IHttpResponse } from "../protocols";

export class ArticleController implements IControllers {
  async handle(httresquest: IHttpRequest): Promise<IHttpResponse> {
    return {
      body: new Error("Title not found"),
      statusCode: 400,
    };
  }
}
