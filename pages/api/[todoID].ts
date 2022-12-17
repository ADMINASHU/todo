import dbConnect from "../../DB/dbConnect";
import Todo from "../../models/Todo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { todoID } = req.query;
  // connect db
  await dbConnect();
  // update todo task
  if (method === "PUT") {
    try {
      const result = await Todo.findByIdAndUpdate(todoID, { $set: req.body }, { new: true });
      res.status(200).json({ data: result, message: "Task updated" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }
  // delete todo task
  if (method === "DELETE") {
    try {
      await Todo.findByIdAndDelete(todoID);
      res.status(200).json({ message: "Task deleted" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }
}
