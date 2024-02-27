import app from "@/main/app/app"
import request from "supertest";
describe("enable-cors", () => {
  test("should enable-cors", async () => {
    app.get("/enable-cors", (req, res) => {
      res.send();
    });
    await request(app)
      .get("/enable-cors")
      .expect("access-control-allow-origin", "*");
  });
});
