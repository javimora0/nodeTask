const {Router} = require('express')
const {check} = require('express-validator')
const controller = require('../controllers/taskController')
const midJWT = require('../middlewares/validarJWT')

const router = Router()


module.exports = router