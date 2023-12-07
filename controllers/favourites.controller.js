const config = require("../config/config");
const { sequelize, models, Sequelize } = require("../config/sequelize-config");
const Op = Sequelize.Op;

const addfavoritescontroller = async (req, res) => {
  try {
    const favouriteCreate = await models.favourites.create({
      user_id: req.body.user_id,
      item_id: req.body.item_id,
    });
    return res.json({
      favouriteCreate,
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};
// const getFavController = async (req, res) => {
//   try {
//     if (!req.query.user_id) {
//       return res.status(400).json({ error: "Please provide a user_id" });
//     }

//     const items = await models.items.findAll({
//       include: [
//         {
//           model: models.favourites,
//           where: { user_id: req.query.user_id },
//         },
//       ],
//       where: {
//         item_name: {
//           [Sequelize.Op.iLike]: `%${req.query.search || ""}%`,
//         },
//       },
//       order: [
//         [
//           "price",
//           req.query.sortOrder && req.query.sortOrder.toUpperCase() === "DESC"
//             ? "DESC"
//             : "ASC",
//         ],
//       ],
//       attributes: ["item_name", "price"],
//       logging: true,
//     });

//     res.json({
//       rows: items,
//       count: items.length,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
const getFavController = async (req, res) => {
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
    const getUserFav = await models.favourites.findAll({
      //attributes: [user_id, item_id, fav_id],
      where: {
        user_id: req.query.user_id,
      },
      order: [[models.items, "item_price", sortPrice ? sortPrice : "DESC"]],
      include: [
        {
          model: models.items,
          required: true,
          where: whereQuery,
          attributes: ["item_name", "item_content", "item_price"],
        },
      ],

      logging: true,
    });
    res.json({
      getUserFav,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  addfavoritescontroller,
  getFavController,
};
