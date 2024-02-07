import {
  IArticleRepositore,
  IArticleRequest,
} from "@/data/interface/article-repositore";
import { IArticle } from "@/domain/models/article";
import { mongoHelper } from "../helpers/mongo-helper";

export class AddArticleRepositore implements IArticleRepositore {
  async add(data: IArticleRequest): Promise<IArticle> {
    const articleCollection = await mongoHelper.getCollection("articles");
    const create = await articleCollection.insertOne(data);
    const article = await articleCollection.findOne(create.insertedId);
    return {
      id: article._id.toString(),
      title: article.title,
      article: article.article,
    };
  }
}
