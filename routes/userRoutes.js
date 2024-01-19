const {Router} = require('express')
const {check} = require('express-validator')
const controller = require('../controllers/taskController')
const midJWT = require('../middlewares/validarJWT')
const userController = require("../controllers/userController");

const router = Router()

router.put('/change_password', userController.modificarPassword)

module.exports = router