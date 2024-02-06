import { IValidator } from "@/controllers/protocols/validationData";

export class DataValidator implements IValidator {
  validate(data: any) {
    const verify = ["title", "article"];
    for (let key of verify) {
      if (!data[key]) {
        return `${key} not found`;
      }
    }

    for (let key of verify) {
      if (typeof data[key] === "string") {
        return `${key} shold be string`;
      }
    }
  }
}
