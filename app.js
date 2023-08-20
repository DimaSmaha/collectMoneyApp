const express = require("express");

const app = express();
const port = process.env.PORT || 5050;

app.use(express.static("public_modules"));

app.get("/home.html", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
