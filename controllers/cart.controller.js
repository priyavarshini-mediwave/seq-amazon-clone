const config = require("../config/config");
// const pgClient = require('./pg-config');
const { sequelize, models, Sequelize } = require("../config/sequelize-config");
// const Op = Sequelize.Op;

const addCartController = async (req, res) => {
  try {
    const CartCreate = await models.cart.create({
      user_id: req.body.user_id,
      item_id: req.body.item_id,
    });
    return res.json({
      CartCreate,
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};
module.exports = addCartController;
