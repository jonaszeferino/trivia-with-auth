import client from "../../../mongoConnection";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const collection = client.db("triviaBrazil").collection("stats");

  try {
    const user_email = req.body.user_email;

    if (typeof user_email !== "string" || user_email.trim() === "") {
      res.status(400).json({ error: "user_email must be a non-empty string" });
      return;
    }

    const matchStage = { user_email: user_email };
    const pipeline = [
      { $match: matchStage },
      {
        $group: {
          _id: "$difficulty",
          correct_0_count: {
            $sum: { $cond: [{ $eq: ["$correct", 0] }, 1, 0] },
          },
          correct_1_count: {
            $sum: { $cond: [{ $eq: ["$correct", 1] }, 1, 0] },
          },
        },
      },
    ];

    const result = await collection.aggregate(pipeline).toArray();

    if (result.length === 0) {
      
      res.status(404).json({ message: "Nenhum resultado encontrado" });
    } else {
      
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
