import {Schema, model, models} from "mongoose";

const todoSchema = new Schema({
  task: { type: String, required: true },
  status: { type: Boolean, default: false },
});

export default models.Todo || model("Todo", todoSchema);
