const { Router } = require('express')
const { check } = require('express-validator')
const authController = require('../controllers/authController')


const router = Router()

router.post('/login', authController.login)
router.get('/:id', authController.obtenerUsuariosConRoles);


module.exports = router