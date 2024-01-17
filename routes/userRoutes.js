const { Router } = require('express')
const { check } = require('express-validator')
const userController = require('../controllers/userController')
const midsJWT = require('../middlewares/midsJWT')

const router = Router()

router.post('/', userController.obtenerUsuarios)

module.exports = router