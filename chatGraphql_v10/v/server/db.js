import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(
  "mongodb+srv://albinkurtaj:mhjjpiIYKZaqMuKA@cluster0.1ie8dsn.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

await client.connect();

export { client };
