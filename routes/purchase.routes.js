const express = require("express");
const router = express.Router();
const { validate } = require("../middlewares/validate.middleware");
const { buyItemSchema } = require("../validations/buyItem.schema");
const { purchasesController } = require("../controllers/purchases.controller");

const {
  updateStatusController,
  cancelListController,
} = require("../controllers/CancelListController");
const { listController } = require("../controllers/purchases.controller");
router.post("/add-Purchases", validate(buyItemSchema), purchasesController);
router.get("/listBoughtItems/:user_id", listController);
//router.get("/listBoughtItems/:user_id", PurchaseslistController);

router.get("/cancel/list", cancelListController);
router.put("/cancel", updateStatusController);
module.exports = router;
