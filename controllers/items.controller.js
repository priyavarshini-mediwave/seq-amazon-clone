const config = require("../config/config");
// const pgClient = require('./pg-config');
const { sequelize, models, Sequelize } = require("../config/sequelize-config");
// const Op = Sequelize.Op;

const addItemController = async (req, res) => {
  try {
    const itemsCreate = await models.items.create({
      item_name: req.body.item_name,
      item_content: req.body.item_content,
      item_price: req.body.item_price,
      item_count: req.body.item_count,
    });
    return res.json({
      itemsCreate,
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};
// update item content
const updateitemController = async (req, res) => {
  try {
    const itemsUpdate = await models.items.update(
      {
        item_name: req.body.item_name,
        item_content: req.body.item_content,
        price: req.body.price,
        // item_count: req.body.item_count,
      },
      {
        where: {
          item_id: req.query.item_id,
        },
        returning: true,
      }
    );
    return res.json({
      itemsUpdate,
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};
// get all items
const getallitemcontroller = async (req, res) => {
  const pgRes = await pgClient.query("SELECT * from items");
  res.json({
    rows: pgRes.rows,
  });
};
// get single item by id
const getbysingleitemcontroller = async (req, res) => {
  const itemId = req.params.itemId;
  const pgRes = await pgClient.query("SELECT * FROM items WHERE item_id = $1", [
    itemId,
  ]);
  if (pgRes.rowCount === 0) {
    res.status(404).json({ error: "Item not found" });
  } else {
    res.json({
      rows: pgRes.rows,
      count: pgRes.rowCount,
    });
  }
};

// sort by price ascending
const sortPriceAscendingcontroller = async (req, res) => {
  const pgRes = await pgClient.query("SELECT * from items ORDER BY price ASC");
  res.json({
    rows: pgRes.rows,
  });
};
// Sort price in descending order
const sortPriceDecendingcontroller = async (req, res) => {
  const pgRes = await pgClient.query("SELECT * from items ORDER BY price DESC");
  res.json({
    rows: pgRes.rows,
  });
};
// sort  item name ascending order
const sortItemnameAScensingcontroller = async (req, res) => {
  const pgRes = await pgClient.query(
    "SELECT * from items ORDER BY item_name ASC"
  );
  res.json({
    rows: pgRes.rows,
  });
};
//Descending by item name
const sortItemnameDecensingcontroller = async (req, res) => {
  const pgRes = await pgClient.query(
    "SELECT * from items ORDER BY item_name DESC"
  );
  res.json({
    rows: pgRes.rows,
  });
};
// filter by price
const filterItemPricecontroller = async (req, res) => {
  if (req.query.priceRange) {
    const priceRanges = req.query.priceRange.split("-");
    const minPrice = parseFloat(priceRanges[0]);
    const maxPrice = parseFloat(priceRanges[1]);
    query = `SELECT * FROM items  WHERE items.price BETWEEN ${minPrice} AND ${maxPrice}`;
  }
  const pgRes = await pgClient.query(query);
  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
};

//  search by item name
const SearchItemNamecontroller = async (req, res) => {
  if (req.query.search) {
    query = `  SELECT * FROM items WHERE item_name ILIKE '%${req.query.search}%'`;
  }
  const pgRes = await pgClient.query(query);
  if (pgRes.rowCount === 0) {
    res.status(404).json({ error: "Item not found" });
  } else {
    res.json({
      rows: pgRes.rows,
      count: pgRes.rowCount,
    });
  }
};
const sortItemPriceController = async (req, res) => {
  try {
    const { sortOrder } = req.query;

    if (sortOrder && (sortOrder === "asc" || sortOrder === "desc")) {
      const items = await models.items.findAll({
        order: [["price", sortOrder]],
      });

      return res.json({
        items,
      });
    } else {
      return res.status(400).json({
        error: 'Invalid sortOrder parameter. Use "asc" or "desc".',
      });
    }
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};
const sortItemNameController = async (req, res) => {
  try {
    const { sortOrder } = req.query;

    if (
      sortOrder &&
      (sortOrder.toLowerCase() === "asc" || sortOrder.toLowerCase() === "desc")
    ) {
      const items = await models.items.findAll({
        order: [["item_name", sortOrder.toUpperCase()]],
      });

      return res.json({
        items,
      });
    } else {
      return res.status(400).json({
        error: 'Invalid sortOrder parameter. Use "asc" or "desc".',
      });
    }
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

module.exports = {
  addItemController,
  updateitemController,
  getallitemcontroller,
  getbysingleitemcontroller,
  filterItemPricecontroller,
  SearchItemNamecontroller,
  sortItemNameController,
  sortItemPriceController,
};
