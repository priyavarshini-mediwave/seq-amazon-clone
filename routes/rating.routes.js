const express = require("express");
const router = express.Router();
const { validate } = require("../middlewares/validate.middleware");
const { ratingValueSchema } = require("../validations/ratingValue.schema");
const {
  addRatingController,
  overallRatingController,
  RatingList,
} = require("../controllers/addRating.controller");
router.post("/add-rating", validate(ratingValueSchema), addRatingController);
router.get("/overallRating", overallRatingController);
//router.get("/overallRating/:item_id", RatingList);
module.exports = router;
