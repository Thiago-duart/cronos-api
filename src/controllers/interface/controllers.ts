import { IHttpRequest, IHttpResponse } from "./https";

export interface IControllers {
  handle(httresquest: IHttpRequest): Promise<IHttpResponse>;
}
