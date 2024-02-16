import { mongoHelper } from "@/infra/db/mongodb/helpers/mongo-helper";
import app from "@/main/app/app";
import { articleData } from "../../../tests/mocks/article-data";

import request from "supertest";
describe("article", () => {
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
    test("should must create an account in the database -- article", async () => {
        await request(app)
            .post("/api/article")
            .send(articleData.validData.body)
            .expect(function (res) {
                res.body.id = "valid-id"
                res.body.img = "valid-img"
                res.body.title = "valid-title"
                res.body.article = "valid-article"
            }).expect(201, {
                id: "valid-id",
                img: "valid-img",
                title: "valid-title",
                article: "valid-article"
            },)
    });
    test("should return 400 and message error title required -- article", async () => {
        await request(app)
            .post("/api/article")
            .send(articleData.withoutTitle.body)
            .expect(400, {
                error: {
                    title: [
                        "Required"
                    ]
                }
            },)
    });
    test("should return 400 and message error article required -- article", async () => {
        await request(app)
            .post("/api/article")
            .send(articleData.withoutArticle.body)
            .expect(400, {
                error: {
                    article: [
                        "Required"
                    ]
                }
            },)
    });
    test("should return 400 and message error img required -- article", async () => {
        await request(app)
            .post("/api/article")
            .send(articleData.withoutImg.body)
            .expect(400, {
                error: {
                    img: [
                        "Required"
                    ]
                }
            },)
    });
});
