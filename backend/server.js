const express = require("express");
const cors = require("cors");
const donorRoutes = require("./routes/donorRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/donors", donorRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
