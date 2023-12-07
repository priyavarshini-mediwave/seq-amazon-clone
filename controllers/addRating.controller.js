const config = require("../config/config");
const { sequelize, models, Sequelize } = require("../config/sequelize-config");
const rating = require("../models/rating");

const addRatingController = async (req, res) => {
  try {
    const addRating = await models.rating.create({
      ratingValue: req.xop.ratingValue,
      user_id: req.xop.user_id,
      item_id: req.xop.item_id,
    });
    return res.json({
      addRating,
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const overallRatingController = async (req, res) => {
  const ratings = await models.rating.findAll({
    attributes: [
      [Sequelize.fn("AVG", Sequelize.col("ratingValue")), "overall_rating"],
      "item_id",
    ],
    group: ["item_id"],
  });

  res.json({
    ratings,
    // count: ratings.length,
  });
};

module.exports = { addRatingController, overallRatingController };
