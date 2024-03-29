const {response, request} = require('express')
const Conexion = require('../database/ConexionTask');
const ConexionUser = require('../database/ConexionUser')
const conx = new Conexion()
const conxUser = new ConexionUser()
const crearTarea = async (req = request, res = response) => {
    let tarea = await conx.insetarTarea(req.body)
    if (!tarea) {
        return res.status(203).json({'success': false, 'mssg': 'Error al crear tarea'})
    }

    if (req.body.completada === 1) {
        await conxUser.sumarTareaCompletada(req.body.id_usuario)
    }

    res.status(200).json({'success': true, 'data': tarea})
}

const modificarTarea = async (req = request, res = response) => {
    let tarea = await conx.updateTarea(req.body, req.params.id)
    if (!tarea) {
        return res.status(203).json({'success': false, 'mssg': 'Error al modificar la tarea'})
    }
    let usuario = await conxUser.getUsuario(req.body.id_usuario)
    if (req.body.completada === 1) {
        usuario = await conxUser.sumarTareaCompletada(req.body.id_usuario)
    }
    if (!usuario) {
        return res.status(203).json({'success': false, 'mssg': 'Error al añadir tarea al usuario'})
    }
    res.status(200).json({'success': true, 'data': tarea})
}

const obtenerTarea = async (req = request, res = response) => {
    let resultado = await conx.getTarea(req.params.id)
    if (!resultado) {
        return res.status(200).json({'success': false, 'mssg': 'No existe esta tarea'})
    }
    res.status(200).json({'success': true, 'data': resultado})
}

const obtenerTareas = async (req = request, res = response) => {
    let resultado = await conx.getTareas()
    res.status(200).json({'success': true, 'tareas': resultado})
}

const borrarTarea = async (req = request, res = response) => {
    let resultado = await conx.deleteTarea(req.params.id)
    if (!resultado) {
        return res.status(203).json({'success': false, 'mssg': 'La terea no existe'})
    }
    res.status(200).json({'success': true, 'mssg': 'Tarea eliminada'})

}

const asignarTarea = async (req = request, res = response) => {
    let resultado = await conx.asignarTarea(req.params.idTarea, req.params.idUsuario)
    if (!resultado) {
        return res.status(203).json({'success': false, 'mssg': 'Error al asignar la tarea'})
    }
    res.status(200).json({'success': true, 'mssg': 'Tarea asignada'})
}

const tareasUsuarios = async (req = request, res = response) => {
    let resultado = await conx.tareasUsuarios()
    if (!resultado) {
        return res.status(203).json({'success': false, 'mssg': 'Error al obtener tareas'})
    }
    res.status(200).json({'success': true, 'data': resultado})

}

const taskDisponibles = async (req = request, res = response) => {
    let tareasDisponibles = await conx.getTareasDisponibles()
    if (!tareasDisponibles) {
        return res.status(203).json({'success': false, 'mssg': 'Error al obtener tareas'})
    }
    res.status(200).json({'succes': true, 'tareas': tareasDisponibles})
}

const obtenerTareasUsuario = async (req = request, res = response) => {
    let resultado = await conx.getTareasUsuario(req.params.id)
    console.log(resultado.length)
    res.status(200).json({'success': true, 'tareas': resultado})
}

const modificarTareaUsuario = async (req = request, res = response) => {
    let tarea = await conx.updateTarea(req.body, req.params.idTarea)

    if (!tarea) {
        return res.status(203).json({'success': false, 'mssg': 'Error al modificar la tarea'})
    }
    if (req.body.completada === 1) {
        await conxUser.sumarTareaCompletada(req.params.idUsuario)
    }
    res.status(200).json({'success': true, 'data': tarea})
}

const tareasCompletadas = async (req = request, res = response) => {
    let tareas = await conx.getTareasCompletadas()
    if (!tareas) {
        return res.status(203).json({'success': false, 'mssg': 'Error al obtener las tareas'})
    }
    res.status(200).json({'success': true, 'data': tareas})
}

const tareasPendientes = async (req = request, res = response) => {
    let tareas = await conx.getTareasPendientes()
    if (!tareas) {
        return res.status(203).json({'success': false, 'mssg': 'Error al obtener las tareas'})
    }
    res.status(200).json({'success': true, 'data': tareas})
}


module.exports = {
    crearTarea,
    modificarTarea,
    obtenerTarea,
    obtenerTareas,
    borrarTarea,
    asignarTarea,
    tareasUsuarios,
    taskDisponibles,
    obtenerTareasUsuario,
    modificarTareaUsuario,
    tareasCompletadas,
    tareasPendientes,
}