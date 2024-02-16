import { IMiddleware } from "../../../controllers/interface/middlewares";
import { NextFunction, Request, Response } from "express";

export function middlewareAdapter(middleware: IMiddleware) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const request = {
            id: req?.params?.id || null
        }
        const middlewareResponse = await middleware.handle(request)
        if (middlewareResponse.statusCode === 200) {
            return next()
        }
        return res.status(middlewareResponse.statusCode).json(middlewareResponse.body)
    }
}