import { IArticleController } from "../../controllers/article";
import { Request, Response } from "express";
export class RoutesArticleAdapter {
    private readonly articleController: IArticleController
    constructor(articleController: IArticleController) {
        this.articleController = articleController
    }
    add() {
        return async (req: Request, res: Response) => {
            const response = await this.articleController.add(req)
            return res.status(response.statusCode).json(response.body)
        }
    }
    find() {
        return async (req: Request, res: Response) => {
            const response = await this.articleController.find()
            res.status(response.statusCode).json(response.body)
        }
    }
    findId() {
        return async (req: Request, res: Response) => {
            const response = await this.articleController.findId(req)
            res.status(response.statusCode).json(response.body)
        }
    }
    update() {
        return async (req: Request, res: Response) => {
            const response = await this.articleController.update(req)
            res.status(response.statusCode).json(response.body)
        }
    }
    delete() {
        return async (req: Request, res: Response) => {
            const response = await this.articleController.delete(req)
            res.status(response.statusCode).json(response.body)
        }
    }
}