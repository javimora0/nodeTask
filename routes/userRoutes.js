const {Router} = require('express')
const midJWT = require('../middlewares/validarJWT')
const userController = require("../controllers/userController");
const mid = require("../middlewares/checkDatos")

const router = Router()


// Modifica la contraseña de un usuario
router.put('/change_password/:id',midJWT.validarToken, mid.existeUsuario,userController.modificarPassword)
router.post('/send_password', userController.sendMail)

// Obtener ranking de jugadores
router.get('/ranking', midJWT.validarToken, userController.getRanking)
module.exports = router