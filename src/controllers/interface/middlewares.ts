import { IHttpResponse } from "./https";

export interface IMiddleware<t = any> {
    handle(request: t): Promise<IHttpResponse>
}