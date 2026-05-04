import bcrypt from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import LostPetModel from "./Models/LostPetModel.js";
import PetModel from "./Models/PetModel.js";
import UserModel from "./Models/UserModel.js";

dotenv.config(); // تحميل متغيرات البيئة

const app = express();
app.use(express.json());
app.use(cors());

// رابط الاتصال - تأكد من تفعيل الوصول (IP Access) من لوحة تحكم MongoDB Atlas
const connectString = process.env.MONGO_URI || "mongodb+srv://ariam:1234@cluster0.8bsc1p0.mongodb.net/aleefDb?retryWrites=true&w=majority";

// تم حذف useNewUrlParser و useUnifiedTopology لأنها لم تعد مدعومة في الإصدارات الجديدة
mongoose
  .connect(connectString)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((error) => console.log("❌ MongoDB connection error:", error));

// تشغيل السيرفر
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

// --- API Endpoints ---
//Register
app.post("/registerUser", async (req, res) => {
  try {
    console.log("Register request received:", req.body);
    const { name, email, phone, password } = req.body;

    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("User saved:", newUser);
    res.status(201).json({ msg: "User registered successfully.", user: newUser });
  } catch (error) {
    console.log("Register error:", error);
    res.status(500).json({ error: "Error in registration" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    res.status(200).json({ user, message: "Success." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Logout
app.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

// Add Pet
app.post("/addPet", async (req, res) => {
  try {
    const pet = new PetModel(req.body);
    await pet.save();
    res.status(201).send({ pet, msg: "Pet added successfully." });
  } catch (error) {
    console.log("Add pet error:", error);
    res.status(500).json({ error: "Error adding pet" });
  }
});

// Get Pets (pet for adoption)
app.get("/getPets", async (req, res) => {
  try {
    const pets = await PetModel.find({}).sort({ createdAt: -1 });
    res.send({ pets });
  } catch (error) {
    res.status(500).json({ error: "Error getting pets" });
  }
});

// Get Pet Details
app.get("/getPet/:id", async (req, res) => {
  try {
    const pet = await PetModel.findById(req.params.id);
    res.send({ pet });
  } catch (error) {
    res.status(500).json({ error: "Error getting pet" });
  }
});

// API for report lost pet
app.post("/reportLostPet", async (req, res) => {
  try {
    const pet = new LostPetModel(req.body);
    await pet.save();
    res.status(201).send({ pet, msg: "Lost pet reported." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error reporting lost pet" });
  }
});

// get all lost pets
app.get("/getLostPets", async (req, res) => {
  try {
    const pets = await LostPetModel.find({}).sort({ createdAt: -1 });
    res.send({ pets });
  } catch (error) {
    res.status(500).json({ error: "Error getting lost pets" });
  }
});

// get my adoption pets by email (profile)
app.get("/myPets/:email", async (req, res) => {
  try {
    const pets = await PetModel.find({ createdByEmail: req.params.email }).sort({
      createdAt: -1,
    });
    res.send({ pets });
  } catch (error) {
    res.status(500).json({ error: "Error getting my pets" });
  }
});

// Delete adoption post
app.delete("/deletePet/:id", async (req, res) => {
  try {
    await PetModel.findByIdAndDelete(req.params.id);
    res.send({ msg: "Pet deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error deleting pet" });
  }
});

//  get my LOST pets by email (profile)
app.get("/myLostPets/:email", async (req, res) => {
  try {
    const pets = await LostPetModel.find({
      createdByEmail: req.params.email,
    }).sort({ createdAt: -1 });
    res.send({ pets });
  } catch (error) {
    res.status(500).json({ error: "Error getting my lost pets" });
  }
});

// Delete LOST post
app.delete("/deleteLostPet/:id", async (req, res) => {
  try {
    await LostPetModel.findByIdAndDelete(req.params.id);
    res.send({ msg: "Lost pet deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error deleting lost pet" });
  }
});

// uPDATE ADOPTION POST
app.put("/updatePet/:id", async (req, res) => {
  try {
    const pet = await PetModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send({ pet });
  } catch (error) {
    res.status(500).json({ error: "Error updating pet" });
  }
});

// UPDATE LOST POST
app.put("/updateLostPet/:id", async (req, res) => {
  try {
    const pet = await LostPetModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send({ pet });
  } catch (error) {
    res.status(500).json({ error: "Error updating lost pet" });
  }
});