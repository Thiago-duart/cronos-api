import {
  IArticleRepositore,
  IArticleRequest,
} from "@/data/interface/article.repositore";
import { IArticle } from "@/domain/models/article";
import { mongoHelper } from "../helpers/mongo-helper";
import { ObjectId } from "mongodb";

export class MongoArticleRepositore implements IArticleRepositore {
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
  async find(): Promise<IArticle[]> {
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
  async findId(id: string): Promise<IArticle | any> {
    const articleCollection = await mongoHelper.getCollection("articles");
    const article = await articleCollection.findOne({ _id: new ObjectId(id) }) || null;
    if (article) {
      const response = {
        id: article._id.toString(),
        img: article.img,
        title: article.title,
        article: article.article,
      }
      return response;
    }
    return article
  }
  async update(id: string, data: any): Promise<IArticle> {
    const articleCollection = await mongoHelper.getCollection("articles");
    const update = await articleCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    const article = await articleCollection.findOne({ _id: new ObjectId(id) });
    return {
      id: article._id.toString(),
      img: article.img,
      title: article.title,
      article: article.article,
    };
  }
  async delete(id: string): Promise<boolean> {
    const articleCollection = await mongoHelper.getCollection("articles");
    const deleteArticle = await articleCollection.deleteOne({
      _id: new ObjectId(id),
    });
    return deleteArticle.acknowledged;
  }
}
