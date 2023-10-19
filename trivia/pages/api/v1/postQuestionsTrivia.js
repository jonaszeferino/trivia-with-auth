import client from "../../../mongoConnection";
import moment from "moment-timezone";

export default async function handler(req, res) {
  console.log("Chamou api mongo");
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const {
    user_email,
    question,
    difficulty,
    correctAnswer,
    incorrectAnswers,
    category,
    myTriviaId,
    isPublic
  } = req.body;

  let date = moment().tz("UTC-03:00").toDate();
  const collection = client.db("triviaBrazil").collection("questions");

  try {
    const result = await collection.insertOne({
      user_email,
      category,
      correctAnswer,
      incorrectAnswers,
      question,
      difficulty,
      myTriviaId,
      isPublic
    });

    console.log("Veremos");

    console.log(result);
    res.status(200).json({ message: "Insert Questions", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
