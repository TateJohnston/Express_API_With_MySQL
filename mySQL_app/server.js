const express = require("express");
require("dotenv").config();
let dbConnect = require("./dbConnect");
const app = express();
let userRoutes = require("./routes/userRoutes");
let postRoutes = require("./routes/postRoutes");

// parse requests of content-type - application / json;

app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my MongoDB application." });
});

// set port, listen for requests

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
