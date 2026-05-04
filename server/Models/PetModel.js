import mongoose from "mongoose";

const PetSchema = mongoose.Schema(
  {
    petName: { type: String, required: true },
    category: { type: String, required: true },
    breed: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    color: { type: String, required: true },
    weight: { type: Number, required: true },
    healthInfo: { type: String },
    vaccinated: { type: Boolean, default: false },
    trained: { type: Boolean, default: false },
    spayed: { type: Boolean, default: false },
    description: { type: String },
    ownerName: { type: String, required: true },
    ownerPhone: { type: String, required: true },
    location: { type: String },
    image: { type: String },
    createdByEmail: { type: String, required: true },
    savedBy: { type: [String], default: [] },
    status: { type: String, default: "Available" },
  },
  {
    timestamps: true,
  }
);

const PetModel = mongoose.model("pets", PetSchema);

export default PetModel;