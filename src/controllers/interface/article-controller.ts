import { IHttpResponse } from "./https";

export interface IArticleController<t=any> {
  add(request: t): Promise<IHttpResponse>;
  find(): Promise<IHttpResponse>;
  findId(request: t): Promise<IHttpResponse>;
  update(request: t): Promise<IHttpResponse>
  delete(request: t): Promise<IHttpResponse>;
}
