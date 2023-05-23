const router = require('express').Router();
const publicDataController = require('../../controllers/publicDataController');


router.route('/')
  .get(publicDataController.getAllProducts);

router.route('/:id')
  .get(publicDataController.getProduct);


module.exports = router;