const connectToMongo = require('./db');
const express = require('express');
const app = express();
const port = 5000;

connectToMongo();
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello, this is your backend server!');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
