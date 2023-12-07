const express = require("express");
const router = express.Router();

const {
  getFavController,
  addfavoritescontroller,
} = require("../controllers/favourites.controller");

router.get("/getfavourite", getFavController);
router.post("/favourites", addfavoritescontroller);

module.exports = router;
