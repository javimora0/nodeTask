const {response, request} = require('express')
const Conexion = require('../database/ConexionTask');

const conx = new Conexion()

const crearTarea = async (req = request, res = response) => {
    let tarea = await conx.insetarTarea(req.body)
    if (!tarea) {
        res.status(203).json({'success': false, 'data': tarea})
    }
    res.status(200).json({'success': true, 'data': tarea})
}

const modificarTarea = async (req = request, res = response) => {
    let tarea = await conx.updateTarea(req.body, req.params.id)
    if (!tarea) {
        res.status(203).json({'success': false, 'data': tarea})
    }
    res.status(200).json({'success': true, 'data': tarea})
}

const obtenerTarea = async (req = request, res = response) => {
    let resultado = await conx.getTarea(req.params.id)
    res.status(200).json({'success': true, 'data': resultado})
}

const obtenerTareas = async (req = request, res = response) => {
    let resultado = await conx.getTareas()
    res.status(200).json({'success': true, 'tareas': resultado})
}

const borrarTarea = async (req = request, res = response) => {
    let resultado = await conx.deleteTarea(req.params.id)
    if (!resultado) {
        res.status(203).json({'success': false, 'mssg': 'La terea no existe'})
    }else {
        res.status(200).json({'success': true, 'mssg': 'Tarea eliminada'})
    }
}

const asignarTarea = async (req = request, res= response) => {
    let resultado = await conx.asignarTarea(req.params.idTarea, req.params.idUsuario)
    if (!resultado) {
        res.status(203).json({'success':false,'mssg':'Error al asignar la tarea'})
    }
    res.status(200).json({'success':true, 'data':resultado})
}

module.exports = {
    crearTarea,
    modificarTarea,
    obtenerTarea,
    obtenerTareas,
    borrarTarea
}