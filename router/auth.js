const router = require('express').Router();
const UserController = require("../controller/auth");

router.post('/registerUser',UserController.registerDetail);
router.post('/loginUser',UserController.loginDetail);

module.exports = router;

