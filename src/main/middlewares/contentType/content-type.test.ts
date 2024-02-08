import app from "@/main/app/app";
import request from "supertest";
describe("content-type", () => {
  test("should return content-type tobe json", async () => {
    app.get("/content-type", (req, res) => {
      res.send();
    });
    await request(app).get("/content-type").expect("Content-Type", /json/);
  });
});
