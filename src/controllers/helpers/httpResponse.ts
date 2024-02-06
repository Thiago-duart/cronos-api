import { ParamError } from "../errors/params-errors";
import { IHttpResponse } from "../protocols";

export function badRequest(error: Error): IHttpResponse {
  return {
    body: error,
    statusCode: 400,
  };
}
