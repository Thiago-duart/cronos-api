import { AddArticleRepositore } from "@/infra/db/mongodb/article-repositore/article-repositore";
import { mongoHelper } from "@/infra/db/mongodb/helpers/mongo-helper";
import { articleData } from "../../../../mocks/article-data";
import "dotenv/config";
describe("./src/infra/db/mongodb/add-article-repositore", () => {
  function makeSut() {
    const sut = new AddArticleRepositore();
    return { sut };
  }
  beforeAll(async () => {
    await mongoHelper.connect(global.__MONGO_URI__);
  });
  beforeEach(async () => {
    const collections = await mongoHelper.getCollection("articles");
    await collections.deleteMany({});
  });
  afterAll(async () => {
    await mongoHelper.desconect();
  });
  test("should return data on success", async () => {
    const { sut } = makeSut();
    const response = await sut.add(articleData.validData.body);
    const { id, ...data } = response;
    expect(id).toBeTruthy();
    expect(data.title).toEqual(articleData.validData.body.title);
    expect(data.article).toEqual(articleData.validData.body.article);
  });
  test("should return an array of articles", async () => {
    const { sut } = makeSut();
    await sut.add(articleData.validData.body);
    const response = await sut.get();
    expect(response).toBeTruthy();
  });
  test("should return an article searched by id", async () => {
    const { sut } = makeSut();
    const create = await sut.add(articleData.validData.body);
    const response = await sut.getId(create.id);
    expect(response).toBeTruthy();
  });
});
