const express = require("express");
const app = express();
const PORT = process.env.PORT || 6060;
const connectDB = require("./config/db");
const form = require("./route/api/form");
const cors = require("cors");
app.use(cors());
//Connect Database
connectDB();

//Initialize bodyparser middleware
app.use(express.json({ extended: false }));

//Test route
app.get("/", (req, res) => {
  res.send("Working");
});

//Route to get data from react form
app.use("/api/form", form);

app.listen(PORT, () => {
  console.log(`Server running on: ${PORT}`);
});
