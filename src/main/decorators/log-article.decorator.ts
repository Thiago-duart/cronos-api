import { ILogErrorRepositore } from "../../data/interface/log-error.repositore";
import { IArticleController } from "../../controllers/article";
export class LogArticleDecorator implements IArticleController {
    private readonly articleController: IArticleController
    private readonly logErrorRepositore: ILogErrorRepositore
    constructor(articleController: IArticleController, logErrorRepositore: ILogErrorRepositore) {
        this.articleController = articleController
        this.logErrorRepositore = logErrorRepositore
    }
    async add(request: any) {
        const response = await this.articleController.add(request)
        if (response.statusCode === 500) {
            this.logErrorRepositore.log(response.body.stack)
        }
        return response
    }
    async find() {
        const response = await this.articleController.find()
        if (response.statusCode === 500) {
            this.logErrorRepositore.log(response.body.stack)
        }
        return response
    }
    async findId(request: any) {
        const response = await this.articleController.findId(request)
        if (response.statusCode === 500) {
            this.logErrorRepositore.log(response.body.stack)
        }
        return response
    }
    async update(request: any) {
        const response = await this.articleController.update(request)
        if (response.statusCode === 500) {
            this.logErrorRepositore.log(response.body.stack)
        }
        return response
    }
    async delete(request: any) {
        const response = await this.articleController.delete(request)
        if (response.statusCode === 500) {
            this.logErrorRepositore.log(response.body.stack)
        }
        return response
    }
}