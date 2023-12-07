const config = require("../config/config");
// const pgClient = require('./pg-config');
const { sequelize, models, Sequelize } = require("../config/sequelize-config");

const Op = Sequelize.Op;

const updateStatusController = async function (req, res) {
  try {
    const updateStatus = await models.purchases.update(
      {
        status: req.body.status,
      },
      {
        where: {
          purchases_id: req.body.purchases_id,
        },
        returning: true,
      }
    );

    res.json({ updateStatus });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
const cancelListController = async (req, res) => {
  try {
    if (!req.query.user_id) {
      return res.status(400).json({ error: "Please provide a user_id" });
    }

    let minPrice;
    let maxPrice;
    let whereQuery = {};
    let sortPrice;
    if (req.query.priceRange) {
      const priceRanges = req.query.priceRange.split("-");
      minPrice = parseFloat(priceRanges[0]);
      maxPrice = parseFloat(priceRanges[1]);
      whereQuery.item_price = {
        [Op.between]: [minPrice, maxPrice],
      };
    }
    if (req.query.search) {
      whereQuery.item_name = {
        [Op.iLike]: `%${req.query.search}%`,
      };
    }
    if (req.query.sortPrice) {
      sortPrice = req.query.sortPrice;
    }
    const getCancelOrder = await models.purchases.findAll({
      attributes: ["status", "purchases_id"],
      where: {
        user_id: req.query.user_id,
        status: "Cancelled",
      },
      order: [[models.items, "item_price", sortPrice ? sortPrice : "DESC"]],
      include: [
        {
          as: "items",
          model: models.items,
          required: true,
          where: whereQuery,
          attributes: ["item_name", "item_content", "item_price"],
        },
      ],

      logging: true,
    });
    res.json({
      getCancelOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
module.exports = { updateStatusController, cancelListController };
