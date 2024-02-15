import { ILogErrorRepositore } from "@/data/interface/log-error.repositore";
import { mongoHelper } from "../helpers/mongo-helper";

export class MongoLogErrorRepositore implements ILogErrorRepositore {
    async log(stack: string): Promise<void> {
        (await mongoHelper.getCollection("errors")).insertOne({
            stack,
            date: new Date()
        })
    }
}