const router = require("express").Router();
const productsController = require("../../controllers/productsController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), productsController.getAllProducts)
  .post(verifyRoles(ROLES_LIST.Admin), productsController.postProduct);

router
  .route("/:id")
  .get(verifyRoles(ROLES_LIST.Admin), productsController.getProduct)
  .put(verifyRoles(ROLES_LIST.Admin), productsController.putProduct)
  .delete(verifyRoles(ROLES_LIST.Admin), productsController.deleteProduct);

module.exports = router;
