const router = require('express').Router();
const orderController = require('../../controllers/orderController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
  .get(verifyRoles(ROLES_LIST.Admin), orderController.getAllOrders)
  .post(orderController.postOrder);

router.route('/:id')
  .get(orderController.getOrder)
  .put(verifyRoles(ROLES_LIST.Admin), orderController.putOrder)
  .delete(verifyRoles(ROLES_LIST.Admin), orderController.deleteOrder);

module.exports = router;