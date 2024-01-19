const {Router} = require('express')
const {check} = require('express-validator')
const controller = require('../controllers/taskController')
const midJWT = require('../middlewares/validarJWT')
const mid = require('../middlewares/checkDatos')

const router = Router()

router.use(midJWT.validarToken)

// Todas las tareas disponibles
router.get('/disponibles',controller.taskDisponibles)

// Asinar tarea disponible a un usuario
router.put('/asignar/:idTarea/:idUsuario', controller.asignarTarea)

// Consultar tareas de un usuario introducion id del usuario
router.get('/:id',mid.existeUsuario, controller.obtenerTareasUsuario)

// Usuario indica porcentaje y estado de su propia tarea
router.put('/:idTarea/:idUsuario',mid.perteneceTarea,controller.modificarTareaUsuario)


module.exports = router