const router = require('express').Router();
const cartController = require('../../controllers/cartController');

router.route('/')
  .post(cartController.postCart);

router.route('/:id')
  .get(cartController.getCart)
  .put(cartController.putCart)
  .delete(cartController.deleteCart);

module.exports = router;