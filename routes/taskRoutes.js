const {Router} = require('express')
const {check} = require('express-validator')
const controller = require('../controllers/taskController')
const midJWT = require('../middlewares/validarJWT')

const router = Router()

router.use(midJWT.validarToken)

// Todas las tareas disponibles
router.get('/disponibles',controller.taskDisponibles)

// Asinar tarea disponible a un usuario
router.put('/asignar/:idTarea/:idUsuario', controller.asignarTarea)

module.exports = router