const {Router} = require('express')
const midJWT = require('../middlewares/validarJWT')
const userController = require("../controllers/userController");
const mid = require("../middlewares/checkDatos")

const router = Router()

router.use(midJWT.validarToken)

// Modifica la contraseña de un usuario
router.put('/change_password/:id', mid.checkPassword,userController.modificarPassword)

module.exports = router