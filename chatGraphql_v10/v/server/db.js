import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(
  //connection String for mongodb database,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

await client.connect();

export { client };
