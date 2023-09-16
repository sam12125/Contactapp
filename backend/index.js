const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const UserModel = require("./Models/User");

app.use(cors());
app.use(bodyParser.json());

const dbURL =
  "mongodb+srv://saiyamvaid:9760888906@cluster0.llilrhp.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

app.get("/", (req, res) => {
  res.write("hello");
  console.log(db);
  res.end("");
});

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/api/contacts", async (req, res) => {
  try {
    const items = await UserModel.find(); 
    console.log("hi", items);
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/contacts", async (req, res) => {
  const userModel = new UserModel({
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
  });

  console.log("insert api", req.body);

  try {
    const data = await userModel.save();
    res.status(200).send("Inserted to db");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting data into the database");
  }
});

app.put("/api/contacts", async (req, res) => {
  try {
    const updatedData = await UserModel.findByIdAndUpdate(
      req.query.id,
      {
        name: req.body.name,
        number: req.body.number,
        email: req.body.email,
      },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).send("User not found");
    }

    res.status(200).send(updatedData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating user data");
  }
});

app.delete("/api/contacts", async (req, res) => {
  try {
    const deletedData = await UserModel.deleteOne({ _id: req.query.id });

    if (deletedData.deletedCount === 0) {
      return res.status(404).send("User not found");
    }

    res.status(200).send("User deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting user data");
  }
});

app.listen(8080, () => {
  console.log(`Server is running on port ${8080}`);
});
