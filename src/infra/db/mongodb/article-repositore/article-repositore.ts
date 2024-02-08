import {
  IArticleRepositore,
  IArticleRequest,
  IUpdateArticle,
} from "@/data/interface/article-repositore";
import { IArticle } from "@/domain/models/article";
import { mongoHelper } from "../helpers/mongo-helper";
import { ObjectId } from "mongodb";

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
  async getId(id: string): Promise<IArticle> {
    const articleCollection = await mongoHelper.getCollection("articles");
    const article = await articleCollection.findOne({ _id: new ObjectId(id) });
    return {
      id: article._id.toString(),
      img: article.img,
      title: article.title,
      article: article.article,
    };
  }
  async update(id: string, data: IUpdateArticle): Promise<IArticle> {
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
