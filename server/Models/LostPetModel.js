import mongoose from "mongoose";

const LostPetSchema = mongoose.Schema(
  {
    petName: { type: String, required: true },
    category: { type: String, required: true },
    breed: { type: String },
    lastSeenLocation: { type: String, required: true },
    region: { type: String, required: true },
    daysMissing: { type: Number, required: true },
    ownerName: { type: String, required: true },
    ownerPhone: { type: String, required: true },
    image: { type: String },
    createdByEmail: { type: String, required: true },
  },
  { timestamps: true }
);

const LostPetModel = mongoose.model("lostPets", LostPetSchema);

export default LostPetModel;