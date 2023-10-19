import client from "../../../mongoConnection";
import moment from "moment-timezone";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { user_email, questionId, correct, difficulty } = req.body;

  let date = moment().tz("UTC-03:00").toDate();
  const collection = client.db("triviaBrazil").collection("stats");

  try {
    const result = await collection.insertOne({
      user_email: user_email ? user_email : null,
      questionId: questionId ? questionId : null,
      correct: correct ? correct : 0,
      difficulty: difficulty ? difficulty : null,
    });

    console.log(result);
    res.status(200).json({ message: "Insert Like", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
