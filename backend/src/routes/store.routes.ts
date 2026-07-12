import express from "express";

const router = express.Router();

const validate = require("../middleware/validate.middleware");
const storeController = require("../controllers/store.controller");

const {
  createStoreSchema,
  updateStoreSchema,
} = require("../validators/store.validator");

router.post("/", validate(createStoreSchema), storeController.createStore);

router.get("/", storeController.getStores);

router.get("/:store_id", storeController.getStoreById);

router.patch(
  "/:store_id",
  validate(updateStoreSchema),
  storeController.updateStore,
);

router.patch("/:store_id/delete", storeController.deleteStore);

module.exports = router;
export {};
