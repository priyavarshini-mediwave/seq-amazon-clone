const express = require("express");
const router = express.Router();
const { addItemController } = require("../controllers/items.controller");

const {
  updateitemController,
  getallitemcontroller,
  getbysingleitemcontroller,
  filterItemPricecontroller,
  SearchItemNamecontroller,
  sortItemNameController,
  sortItemPriceController,
} = require("../controllers/items.controller");
// const {
//   addfavoritescontroller,
// } = require("../controllers/favourites.controller");
const { validate } = require("../middlewares/validate.middleware");
const {
  itemaddSchema,
  updateitemSchema,
} = require("../validations/items.schema");

//router.post("/add-items", addItemController);
router.post("/add-items", validate(itemaddSchema), addItemController);
router.patch("/update-item", validate(updateitemSchema), updateitemController);
router.get("/items", getallitemcontroller);
router.get("/get-one-item", getbysingleitemcontroller);

router.get("/filter", filterItemPricecontroller);
router.get("/search", SearchItemNamecontroller);
router.get("/sort-by-name", sortItemNameController);
router.get("/sort-by-price", sortItemPriceController);

//router.post("/favourites", addfavoritescontroller);

module.exports = router;
