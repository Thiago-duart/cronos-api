import { IArticleMethods, IHttpResponse, IValidator, ServerError, badRequest, created, noContent, ok, serverError, IArticleController } from ".";

export class ArticleController implements IArticleController {
  private readonly articleMethods: IArticleMethods;
  private readonly validator: IValidator
  constructor(articleMethods: IArticleMethods, validator: IValidator) {
    this.articleMethods = articleMethods
    this.validator = validator
  }
  async add(request: any): Promise<IHttpResponse> {
    try {
      const isValid: any = this.validator.addValidate(
        request.body
      );
      if (isValid) {
        return badRequest({ error: isValid });
      }
      const response = await this.articleMethods.add(request.body);
      return created(response);
    } catch (error) {
      return serverError(new ServerError(error.stack));
    }
  }
  async find(): Promise<IHttpResponse> {
    try {
      const response = await this.articleMethods.find();
      return ok(response);
    } catch (error) {
      return serverError(new ServerError(error.stack));
    }
  }
  async findId(request: any): Promise<IHttpResponse> {
    try {
      const id = request?.params?.id || false;
      if (!id) {
        return badRequest({ error: { id: "Required" } });
      }
      const response = await this.articleMethods.findId(id);
      return ok(response);
    } catch (error) {
      return serverError(new ServerError(error.stack));
    }
  }
  async update(request: any): Promise<IHttpResponse> {
    try {
      const id = request?.params?.id || false;
      if (!id) {
        return badRequest({ error: { id: "Required" } });
      }
      const data = request?.body
      const updated = await this.articleMethods.update(id, data);
      return ok(updated);
    } catch (error) {
      return serverError(new ServerError(error.stack));
    }
  }
  async delete(request: any): Promise<IHttpResponse> {
    try {
      const id = request?.params || false;
      if (!id) {
        return badRequest({ error: { id: "Required" } });
      }
      await this.articleMethods.delete(id);
      return noContent();
    } catch (error) {
      return serverError(new ServerError(error.stack));
    }
  }
}