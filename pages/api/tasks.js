import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://kazi:nkdhpwuqDfSvOIQc@cluster0.qeakjte.mongodb.net/next_js_todo?retryWrites=true&w=majority"
    );

    const db = client.db();

    const todoCollection = db.collection("next_js_todo");
    const result = await todoCollection.insertOne(data);

    console.log(result);

    await client.close();

    res.status(201).json({ message: "Todo inserted!" });
  }

  if (req.method === "GET") {
    const client = await MongoClient.connect(
      "mongodb+srv://kazi:nkdhpwuqDfSvOIQc@cluster0.qeakjte.mongodb.net/next_js_todo?retryWrites=true&w=majority"
    );

    const db = client.db();

    const todoCollection = db.collection("next_js_todo");
    const result = await todoCollection.find().toArray();

    console.log(result);
    res.json(result);

    await client.close();

    res.status(201).json({ message: "Todo Found!" });
  }
}

export default handler;
