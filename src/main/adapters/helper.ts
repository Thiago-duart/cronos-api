import { Response } from "express"

export function responseFormat(response: any,res:Response){
    if (response.statusCode >= 200 && response.statusCode <= 299) {
        return res.status(response.statusCode).json(response.body)
    }else{
        return res.status(response.statusCode).json({error: response.body.message})
    }
}