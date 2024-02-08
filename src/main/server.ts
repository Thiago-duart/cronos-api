import { mongoHelper } from "../infra/db/mongodb/helpers/mongo-helper";
import app from "./app/app";

const PORT = 3000;

mongoHelper.connect(process.env.MongoUrl).then(() => {
  app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
  });
});
