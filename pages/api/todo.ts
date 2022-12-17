import dbConnect from "../../DB/dbConnect";
import Todo from "../../models/Todo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  // connect db
  await dbConnect();
  // create todo task
  if (method === "POST") {
    try {
      const newTask = await new Todo(req.body).save();
      res.status(201).json({ data: newTask, message: "new Task added" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }
  // get todo task
  if (method === "POST") {
    try {
      const Tasks = await Todo.find();
      res.status(200).json({ data: Tasks });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }
}
