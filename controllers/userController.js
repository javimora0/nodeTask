const {response, request} = require('express')
const Conexion = require('../database/ConexionUser');
const ConexionRol = require('../database/ConexionRol');
const ConexionRolUsuario = require('../database/ConexionRolUsuario');
const bcrypt = require('bcrypt');

const conx = new Conexion()
const conxRol = new ConexionRol()
const conxRolUsuario = new ConexionRolUsuario()
const crearUsuario = async (req = request, res = response) => {
    let body = req.body
    body.password = await cifrarPassword(body.password)

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
const cifrarPassword = async (password) => {
    return bcrypt.hash(password, 10);
}

const modificarUsuario = async (req = request, res = response) => {
    req.body.password = cifrarPassword(req.body.password)
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
    let resultado = await conx.changePassword(req.body,req.params.id)
    if (!resultado) {
        return res.status(200).json({'success': false, 'mssg': 'Error al cambiar la contraseña'})
    }
    res.status(200).json({'success': true, 'mssg': 'Contraseña cambiada correctamente', 'data': resultado})
}

const getUsuarioPassword = async (req = request, res = response, old_password) => {
    let usuario = await conx.getUsuarioPassword(old_password, req.params.id)
    if (!usuario) {
        return null
    } else {
        return usuario
    }
}

const asignarRol = async (req = request, res = response) => {
    let rolesAsignado = await conx.getRolesUsuario(req.params.id, req.body.rol)
    console.log(rolesAsignado)
    if (rolesAsignado) {
        return res.status(203).json({'success':false, 'mssg':'El usuario ya tiene este rol'})
    }
    let idRol = await conxRol.getIdRol(req.body.rol)
    let resultado = await conxRolUsuario.asignarRol(req.params.id, idRol.id)
    if (!resultado) {
        return res.status(203).json({'success':false, 'mssg':'Error al asignar el rol'})
    }
    res.status(200).json({'success':true, 'mssg':'Rol asignado correctamente'})
}


module.exports = {
    crearUsuario,
    obtenerUsuario,
    obtenerUsuarios,
    borrarUsuario,
    modificarUsuario,
    modificarPassword,
    getUsuarioPassword,
    asignarRol,
}