const {response, request} = require('express')
const Conexion = require('../database/ConexionUser');
const ConexionRol = require('../database/ConexionRol');
const ConexionRolUsuario = require('../database/ConexionRolUsuario');


const conx = new Conexion()
const conxRol = new ConexionRol()
const conxRolUsuario = new ConexionRolUsuario()
const crearUsuario = async (req = request, res = response) => {

    let usuario = await conx.insertarUsuario(req.body)
    if (!usuario) {
        res.status(203).json({'success': false, 'mssg': 'Error al crear usuario'})
    }

    let rol = await conxRol.getIdRol(req.body.rol)
    let resultado = await conxRolUsuario.asignarRol(usuario.id, rol.id)
    if (!resultado) {
        res.status(203).json({'success': false, 'mssg': 'Error al asignar rol'})
    } else {
        res.status(200).json({'success': true, 'data': usuario})
    }

}

const modificarUsuario = async (req = request, res = response) => {
    let resultado = await conx.updateUsuario(req.body, req.params.id)
    if (!resultado) {
        res.status(203).json({'success': false, 'mssg': 'Error al modificar el usuario'})
    }
    res.status(200).json({'success': true, 'usuario': resultado})

}

const obtenerUsuario = async (req = request, res = response) => {
    let resultado = await conx.getUsuario(req.params.id)
    res.status(200).json({'success': true, 'usuario': resultado})
}

const obtenerUsuarios = async (req = request, res = response) => {
    let resultado = await conx.getUsuarios()
    res.status(200).json({'success': true, 'usuarios': resultado})
}

const borrarUsuario = async (req = request, res = response) => {
    let resultado = await conx.deleteUsuario(req.params.id)
    res.status(200).json({'success': true, 'mssg': 'Usuario eliminado', 'data': resultado})
}

const modificarPassword = async (req = request, res = response) => {

    res.status(200).json({'success': true, 'mssg': 'Usuario eliminado', 'data': 's'})
}

module.exports = {
    crearUsuario,
    obtenerUsuario,
    obtenerUsuarios,
    borrarUsuario,
    modificarUsuario,
    modificarPassword
}