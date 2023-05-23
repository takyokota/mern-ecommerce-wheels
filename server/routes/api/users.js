const router = require('express').Router();
const usersController = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
  .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers);

router.route('/:id')
  .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser)
  .put(verifyRoles(ROLES_LIST.Admin), usersController.putUser)
  .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

module.exports = router;