const { response, request  } = require('express')
const Conexion = require('../database/ConexionUser')
const ConexionTarea = require('../database/ConexionTask')

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

existeTarea = async (req, res, next) => {
    const conx = new ConexionTarea()

    let tarea = await conx.getTarea(req.params.id)
    if (!tarea) {
        return res.status(203).json({'success':false, 'mssg':'Tarea no encontrada'})
    }else {
        next()
    }
}

module.exports = {
    existeUsuario,
    existeTarea
}
