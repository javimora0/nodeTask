const { Router } = require('express')
const { check } = require('express-validator')
const taskController = require('../controllers/taskController')
const mid = require('../middlewares/checkDatos')
const midJWT = require("../middlewares/validarJWT");

const router = Router()

//router.use(midJWT.validarAdmin)


// CRUD TAREAS
router.route('/')
    .get(taskController.obtenerTareas)
    .post(taskController.crearTarea)

router.route('/:id')
    .get(taskController.obtenerTarea)
    .delete(taskController.borrarTarea)
    .put(taskController.modificarTarea)




module.exports = router