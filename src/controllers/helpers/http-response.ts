import { ParamError } from "../errors/params-errors";
import { IHttpResponse } from "../interface";

export function badRequest(error: Error): IHttpResponse {
  return {
    body: error,
    statusCode: 400,
  };
}
export function serverError(error: Error): IHttpResponse {
  return {
    body: error,
    statusCode: 500,
  };
}
