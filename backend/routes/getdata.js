const express = require("express");
const router = express.Router();
const DataModel = require("../models/data");
router.use(express.json());

router.get("/data", async (req, res) => {
  try {
    const data = await DataModel.find();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error..." });
  }
});

module.exports = router;
