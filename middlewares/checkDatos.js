const { response, request  } = require('express')
const Conexion = require('../database/ConexionUser')
const ConexionTarea = require('../database/ConexionTask')
const jwt = require('../middlewares/validarJWT')
const existeUsuario = async (req, res, next) => {
    const conx = new Conexion()
    let id = 0
    if (!req.params.id) {
        id = req.body.id_usuario
    }else {
        id = req.params.id
    }
    let usuario = await conx.getUsuario(id)
    console.log(usuario)
    if (!usuario) {
        return res.status(203).json({'success':false, 'mssg':'Usuario no encontrado'})
    }else {
        next()
    }
}

// Comprueba si una tarea pertenece al usuario indicado
const perteneceTarea = async (req, res, next) => {
    const conx = new ConexionTarea()
    let idUsuario = req.params.idUsuario
    let idTarea = req.params.idTarea

    let tarea = await conx.getTareaUsuario(idUsuario, idTarea)
    console.log(tarea)
    if (!tarea) {
        return res.status(203).json({'success':false, 'mssg':'Esta tarea no pertenece a este usuario'})
    }else {
        next()
    }
}

const existeTarea = async (req, res, next) => {
    const conx = new ConexionTarea()

    let tarea = await conx.getTarea(req.params.id)
    if (!tarea) {
        return res.status(203).json({'success':false, 'mssg':'Tarea no encontrada'})
    }else {
        next()
    }
}

const checkPassword = async (req, res, next) => {
    const conx = new Conexion()
    let usuario = await conx.getUsuarioPassword(req.body.old_password, req.params.id)
    if (!usuario) {
        return res.status(203).json({'success':false, 'mssg':'Usuario incorrecto'})
    }else {
        next()
    }
}

module.exports = {
    existeUsuario,
    existeTarea,
    perteneceTarea,
    checkPassword
}
