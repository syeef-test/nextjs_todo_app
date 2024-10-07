import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "GET") {
    const client = await MongoClient.connect(
      "mongodb+srv://kazi:nkdhpwuqDfSvOIQc@cluster0.qeakjte.mongodb.net/next_js_todo?retryWrites=true&w=majority"
    );

    const db = client.db();

    const todoCollection = db.collection("next_js_todo");
    const result = await todoCollection.find({ completed: true }).toArray();

    //console.log(result);
    res.status(200).json(result);

    await client.close();

    // res.status(201).json({ message: "Todo Found!" });
  }
}

export default handler;
