const {Router} = require('express')
const {check} = require('express-validator')
const taskController = require('../controllers/taskController')
const mid = require('../middlewares/checkDatos')
const midJWT = require("../middlewares/validarJWT");
const {validarCampos} = require("../middlewares/validar-campos");
const {idNoExiste} = require("../helpers/db-validators");

const router = Router()

router.use(midJWT.validarAdmin)

// Tareas realizadas
router.get('/completadas',taskController.tareasCompletadas)

// Tareas pendientes
router.get('/pendientes',taskController.tareasPendientes)

// Tareas de  un programador
router.get('user/:id', mid.existeUsuario,taskController.obtenerTareasUsuario)

// CRUD TAREAS
router.route('/')
    .get(taskController.obtenerTareas)
    .post([
        check('descripcion','La descripcion debe contener entre 5 y 255 carácteres.').isString().isLength({min: 5, max: 255}),
        check('dificultad', 'La dificultad debe ser: XS, M, L, XL').isIn(['XS', 'S', 'M', 'L', 'XL']),
        check('horas_previstas','Las horas previstas para una tarea han de ser entre 1 y 300').isInt({min: 1, max: 300}),
        check('porcentaje','El porcentaje de una tarea debe estar entre 0 - 100').isInt({min: 0, max: 100}),
        check('completada', 'El campo completada solo admite 1 o 0').isInt({min: 0, max: 1}),
        check('id_usuario').custom(idNoExiste),
        validarCampos
    ], taskController.crearTarea)

router.route('/:id')
    .get(mid.existeTarea, taskController.obtenerTarea)
    .delete(mid.existeTarea, taskController.borrarTarea)
    .put([
            check('descripcion','La descripcion debe contener entre 5 y 255 carácteres.').isString().isLength({min: 5, max: 255}),
            check('dificultad', 'La dificultad debe ser: XS, M, L, XL').isIn(['XS', 'S', 'M', 'L', 'XL']),
            check('horas_previstas','Las horas previstas para una tarea han de ser entre 1 y 300').isInt({min: 1, max: 300}),
            check('horas_realizadas','Las horas realizadas para una tarea han de ser entre 1 y 300').isInt({min: 1, max: 300}),
            check('porcentaje','El porcentaje de una tarea debe estar entre 0 - 100').isInt({min: 0, max: 100}),
            check('completada', 'El campo completada solo admite 1 o 0').isInt({min: 0, max: 1}),
            check('id_usuario').custom(idNoExiste),
            validarCampos
    ],mid.existeTarea, taskController.modificarTarea)




//Asigna una tarea a un usuario
//router.put('/:idTarea/:idUsuario',taskController.asignarTarea)
//router.get('/users',taskController.tareasUsuarios)

module.exports = router