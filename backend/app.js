import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://anubhavmi:test123@cluster0.telzkjw.mongodb.net/Test")
  .then(() => {
    console.log("databse connected");
  })
  .catch((error) => {
    console.log(error);
  });
const userSchema = new mongoose.Schema({
  email: String,
  username: String,
});

const user = mongoose.model("user", userSchema);

app.post("/api/senddata", (req, res) => {
  console.log(req.body);
  const newdata = new user({
    email: req.body.email,
    username: req.body.username,
  });
  newdata.save();
  res.status(200);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
