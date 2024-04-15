import mongoose from "mongoose";

const CourtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Court = mongoose.model("Court", CourtSchema);

export default Court;
