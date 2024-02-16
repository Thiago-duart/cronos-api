import { IHttpResponse } from "../interface";

export function badRequest(message: object): IHttpResponse {
  return {
    body: message,
    statusCode: 400,
  };
}
export function serverError(error: Error): IHttpResponse {
  return {
    body: error,
    statusCode: 500,
  };
}
export const created = (data: any): IHttpResponse => ({
  statusCode: 201,
  body: data,
});

export const ok = (data: any): IHttpResponse => ({
  statusCode: 200,
  body: data,
});
export const noContent = (): IHttpResponse => ({
  statusCode: 204,
  body: {},
});
export const notFound = (message: any): IHttpResponse => ({
  statusCode: 404,
  body: message,
});