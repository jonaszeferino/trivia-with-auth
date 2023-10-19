import client from "../../../mongoConnection";

export default async function handler(req, res) {
  console.log("Chamou");
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  const { user_email } = req.body;
  if (!user_email) {
    res.status(400).json({ error: "user_email parameter is missing" });
    return;
  }
  const collection = client.db("triviaBrazil").collection("questions");
  try {
    const cursor = collection.find({ user_email: user_email });
    const questions = await cursor.toArray();

    res.status(200).json({ questions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
