import app from "@/main/app/app";
import request from "supertest";
describe("body-parse", () => {
  test("should manage json", async () => {
    app.post("/body-parse", (req, res) => {
      res.send(req.body);
    });
    await request(app)
      .post("/body-parse")
      .send({ name: "valid_test" })
      .expect({ name: "valid_test" });
  });
});
