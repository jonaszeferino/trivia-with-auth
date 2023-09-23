import client from "../../../mongoConnection";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const collection = client.db("triviaBrazil").collection("questions");

  try {
    
    const cursor = collection.find();

    const questions = await cursor.toArray();

    res.status(200).json({ questions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
