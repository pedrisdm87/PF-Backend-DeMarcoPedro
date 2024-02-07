import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, unique: true },
  age: Number,
  password: String,
  role: {type: String, enum: ['user', 'admin', 'premium'], default:'user'},
  owner: { type: String, required: true, default: 'admin', ref: "users" },
  last_connection: { type: Date, default: Date.now }
});

mongoose.set("strictQuery", false);
const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
