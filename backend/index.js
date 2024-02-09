const express = require("express");
const connectToMongo = require("./db");
const port = process.env.PORT || 5000;
const cors = require("cors");
const apiRoutes = require("./routes/getdata");
const app = express();

app.use(cors());
app.use(express.json());
connectToMongo();

app.use("/api/getdata", require("./routes/getdata"));

app.get("/", (req, res) => {
  res.send("Hello, this is your backend server!");
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
