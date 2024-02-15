//@ts-check
import { IValidator } from "@/controllers/interface/crud-validator";
import { ZodError, z } from "zod";
export class Validator implements IValidator {

  addValidate(data: any) {
    try {
      const schemadata = z.object({
        title: z.string().max(90, { message: "title must have a maximum 90 characters" }),
        img: z.string(),
        article: z.string()
      })
      schemadata.parse(data)
    } catch (error) {
      if (error instanceof ZodError) {
        return { ...error.flatten()?.fieldErrors }
      }
    }
  }
  updateValidate(data: any) {

  }
}
