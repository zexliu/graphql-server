import * as Mongoose from "mongoose";
let db: Mongoose.Connection;
export const connect = () => {
  // add your own uri below
  const uri = "mongodb://root:root@localhost:27017/test?authSource=admin";
  if (db) {
    return;
  }
  Mongoose.set("debug", true);
  Mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  db = Mongoose.connection;
  db.once("open", async () => {
    console.log("Connected to database");
  });
  db.on("error", () => {
    console.log("Error connecting to database");
  });
};
export const disconnect = () => {
  if (!db) {
    return;
  }
  Mongoose.disconnect();
};
