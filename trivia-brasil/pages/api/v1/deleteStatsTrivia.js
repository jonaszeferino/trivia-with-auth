import client from "../../../mongoConnection";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
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

    // Deleta todos os documentos com o email especificado
    const deleteResult = await collection.deleteMany({ user_email });

    if (deleteResult.deletedCount === 0) {
      res.status(404).json({ message: "Nenhum documento encontrado para exclusão" });
    } else {
      res.status(200).json({ message: "Documentos excluídos com sucesso" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
