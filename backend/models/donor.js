const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  id: Number,
  donorName: String,
  age: Number,
  gender: String,
  contact: String,
  branch: String,
  blood: String,
});

module.exports = mongoose.model("Donor", donorSchema);
