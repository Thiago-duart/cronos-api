import { mongoHelper } from "@/infra/db/mongodb/helpers/mongo-helper";
import "dotenv/config";
describe("./src/infra/db/mongodb/add-article-repositore", () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MongoUrl);
  });
  afterAll(async () => {
    await mongoHelper.desconect();
  });
  test("should connect mongodb", async () => {
    const collection = await mongoHelper.getCollection("articles");
    expect(collection).toBeTruthy();
  });
});
