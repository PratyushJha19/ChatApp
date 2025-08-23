import express from "express";
// import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "./models/userModel.js";
import Message from "./models/message.js";

const app = express();
const PORT = 5000;

// dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://jhapratyush2006:Makalipass%40123@cluster0.ga3pl.mongodb.net/ChatApp"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.post("/register", async (req, res) => {
  const { name, email, password, image } = req.body;
  const newUser = new User({ name, email, password, image });
  newUser
    .save()
    .then(() => {
      res.status(201).json({ message: "User registered successfully" });
      console.log(
        `User registered successfully, email: ${email}, name: ${name}`
      );
    })
    .catch((error) => {
      res.status(500).json({ message: "Error registering user", error });
      console.log("Error registering user:", error);
    });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found, please signup" });
    }
    if (user.password !== password) {
      res.status(401).json({ message: "Invalid password" });
    }

    const secretKey = crypto.randomBytes(32).toString("hex");
    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
    console.log("User logged in successfully", token);
  } catch (error) {
    console.log("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
});

app.get("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const users = await User.find({ _id: { $ne: userId } });
    res.json(users);
    console.log(`Users fetched successfully Users: ${users}`);
  } catch (error) {
    console.log("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

app.post("/sendrequest", async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  const receiver = await User.findById(receiverId);
  if (!receiver) {
    return res.status(404).json({ message: "Receiver not found" });
  }

  receiver.requests.push({ from: senderId, message });
  await receiver.save();

  res.status(200).json({ message: "Request sent successfully" });
});

app.get("/getphoto/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ image: user.image });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
