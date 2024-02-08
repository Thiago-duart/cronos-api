import {
  IArticleRepositore,
  IArticleRequest,
  IUpdateArticle,
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
      img: article.img,
      title: article.title,
      article: article.article,
    };
  }
  async get(): Promise<IArticle[]> {
    const articleCollection = await mongoHelper.getCollection("articles");
    const articles = await articleCollection.find().toArray();
    const formatArticles = articles.map((article) => {
      return {
        id: article._id.toString(),
        img: article.img,
        title: article.title,
        article: article.article,
      };
    });
    return formatArticles;
  }
  async getId(): Promise<IArticle> {
    const articleCollection = await mongoHelper.getCollection("articles");
    return;
  }
  async update(data: IUpdateArticle): Promise<IArticle> {
    const articleCollection = await mongoHelper.getCollection("articles");
    return;
  }
  async delete(id: string): Promise<void> {
    const articleCollection = await mongoHelper.getCollection("articles");
    return;
  }
}
