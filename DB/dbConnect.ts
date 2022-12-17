import mongoose from "mongoose";

const uri = process.env.DB_URL;

if (!uri) {
  throw new Error("Please define DB URL");
}
declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log("DB connected");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: object = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(uri!, opts).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  console.log("Trying to connect");
  return cached.conn;
}
export default dbConnect;
