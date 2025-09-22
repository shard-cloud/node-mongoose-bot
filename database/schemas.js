import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  name: String,
  value: String,
  createdAt: { type: Date, default: Date.now },
});

export const DataModel = mongoose.model("Data", dataSchema);
