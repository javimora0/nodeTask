const { Router } = require('express')
const { check } = require('express-validator')
const authController = require('../controllers/authController')
const middlewares = require('../middlewares/middleware')
const { validarCampos } = require('../middlewares/validarCampos')
const router = Router()

router.post('/login', authController.login)
router.post('/registro', authController.registro)

module.exports = router