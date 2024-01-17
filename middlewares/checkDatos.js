const { response, request  } = require('express')
const Conexion = require('../database/ConexionUser')
const conx = new Conexion()

const existeUsuario = async (req, res, next) => {
    let usuario = await conx.getUsuario(req.params.id)
    console.log(usuario)
    if (!usuario) {
        return res.status(203).json({'success':false, 'mssg':'Usuario no encontrado'})
    }else {
        next()
    }
}

module.exports = {
    existeUsuario
}
