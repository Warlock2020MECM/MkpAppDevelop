const mongoose = require("mongoose");

//Schema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Porfavor, agrega un titulo a la publicación"],
    },
    description: {
      type: String,
      required: [true, "Porfavor, agrega una descripcion a la publicación"],
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
