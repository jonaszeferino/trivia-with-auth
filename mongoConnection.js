import { MongoClient, ServerApiVersion } from "mongodb";

const uri = `mongodb+srv://jonaszeferino:${process.env.DB_PASSWORD}@cluster0.mues8vo.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect();

export default client;
