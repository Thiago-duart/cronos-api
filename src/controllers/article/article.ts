import { IArticleDomain } from "@/domain/usecase/article.usecase";
import { IArticleController } from "../interface/article-controller";
import { IHttpResponse } from "../interface";
import { badRequest, created, noContent, ok, serverError } from "../helpers/http-response";
import { ParamError } from "../errors/params-errors";
import { ServerError } from "../errors/server-error";
import { IValidator } from "../interface/data-validator";

export class ArticleController implements  IArticleController{
    private readonly articleDomain: IArticleDomain;
    private readonly validator: IValidator
    constructor(articleDomain:IArticleDomain,validator:IValidator) {
        this.articleDomain = articleDomain
        this.validator = validator
    }
    async add(request: any): Promise<IHttpResponse> {
        try {
            const isValid: string | null = this.validator.validate(
              request.body
            );
            if (isValid) {
              return badRequest(new ParamError(isValid));
            }
            const response = await this.articleDomain.add(request.body);
            return created(response);
          } catch (error) {
            return serverError(new ServerError(error.stack));
          } 
    }
    
   async find(): Promise<IHttpResponse> {
    try {
        const response = await this.articleDomain.find();
        return ok(response);
      } catch (error) {
        return serverError(new ServerError(error.stack));
      }
    }

    async findId(request: any): Promise<IHttpResponse> {
        try {
            const id = request?.body?.id || false;
            if (!id) {
              return badRequest(new ParamError("missing: id"));
            }
            const response = await this.articleDomain.findId(id);
            return ok(response);
          } catch (error) {
            return serverError(new ServerError(error.stack));
          }
    }

    async update(request: any): Promise<IHttpResponse> {
        try {
            const { id, ...data } = request?.body || false;
            if (!id) {
              return badRequest(new ParamError("missing: id"));
            }
            const updated = await this.articleDomain.update(id, data);
            return ok(updated);
          } catch (error) {
            return serverError(new ServerError(error.stack));
          }
    }

    async delete(request: any): Promise<IHttpResponse> {
        try {
            const { id } = request?.body || false;
            if (!id) {
              return badRequest(new ParamError("missing: id"));
            }
            await this.articleDomain.delete(id);
            return noContent();
          } catch (error) {
            return serverError(new ServerError(error.stack));
          }
    }
}