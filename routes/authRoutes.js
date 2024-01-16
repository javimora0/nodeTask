const { Router } = require('express')
const { check } = require('express-validator')
const {login, obtenerUsuariosConRoles} = require('../controllers/authController')
/*
* const middlewares = require('../middlewares/middleware')
* const { validarCampos } = require('../middlewares/validarCampos')
*/

const router = Router()

router.post('/login', login)
router.get('/', obtenerUsuariosConRoles);


module.exports = router