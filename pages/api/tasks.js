import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://kazi:nkdhpwuqDfSvOIQc@cluster0.qeakjte.mongodb.net/next_js_todo?retryWrites=true&w=majority"
    );

    const db = client.db();

    const todoCollection = db.collection("next_js_todo");
    const result = await todoCollection.insertOne(data);

    //console.log(result);

    await client.close();

    res.status(201).json({ message: "Todo inserted!" });
  }

  if (req.method === "GET") {
    const client = await MongoClient.connect(
      "mongodb+srv://kazi:nkdhpwuqDfSvOIQc@cluster0.qeakjte.mongodb.net/next_js_todo?retryWrites=true&w=majority"
    );

    const db = client.db();

    const todoCollection = db.collection("next_js_todo");
    const result = await todoCollection.find({ completed: false }).toArray();

    //console.log(result);
    res.status(200).json(result);

    await client.close();

    // res.status(201).json({ message: "Todo Found!" });
  }

  if (req.method === "PUT") {
    // const data = req.body;
    // console.log("data", data);
    const updatedTask = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://kazi:nkdhpwuqDfSvOIQc@cluster0.qeakjte.mongodb.net/next_js_todo?retryWrites=true&w=majority"
    );

    const db = client.db();

    const todoCollection = db.collection("next_js_todo");
    const result = await todoCollection.updateOne(
      { _id: new ObjectId(updatedTask._id) },
      { $set: { completed: true } }
    );

    //console.log("update", result);
    res.status(200).json(result);

    await client.close();
  }

  if (req.method === "DELETE") {
    // const data = req.body;
    // console.log("data", data);
    const deleteTaskId = req.body._id;
    const client = await MongoClient.connect(
      "mongodb+srv://kazi:nkdhpwuqDfSvOIQc@cluster0.qeakjte.mongodb.net/next_js_todo?retryWrites=true&w=majority"
    );

    const db = client.db();

    const todoCollection = db.collection("next_js_todo");
    const result = await todoCollection.deleteOne({
      _id: new ObjectId(deleteTaskId),
    });

    //console.log("update", result);
    res.status(200).json(result);

    await client.close();
  }
}

export default handler;
