const {response, request} = require('express')
const Conexion = require('../database/ConexionUser')
const ConexionRol = require('../database/ConexionRol')
const models = require('../models/index')
const {generarJWT} = require("../helpers/generate_jwt");

const login = async (req, res = response) => {
    const {email, password, rol} = req.body;

    try {
        const conx = new Conexion();
        const conxRol = new ConexionRol();

        const user = await conx.getUsuarioRegistrado(email, password);
        if (!user) {
            return res.status(203).json({msg: 'Credenciales incorrectas'});
        }

        const idRol = await conxRol.getIdRol(rol);
        if (idRol == null) {
            return res.status(203).json({msg: 'Rol incorrecto'});
        }

        const rolAsignado = await conx.getRolesUsuario(user.id, rol)
        if (!rolAsignado) {
            return res.status(203).json({'success': false, 'mssg': 'El usuario no tiene este rol'})
        }

        const token = generarJWT(user.id, rol);
        return res.status(200).json({msg: 'Login correcto', data: user, token: token});

    } catch (error) {
        console.error(error);
        return res.status(500).json({msg: 'Error en el servidor', error: error});
    }
};

//Obtiene todos los roles del usuario que se le pase por parametro.. Funcion para probar asociaciones
const obtenerUsuariosConRoles = async (req, res) => {
    try {
        const usuariosConRoles = await models.User.findAll({
            include: [{
                model: models.Rol,
                as: 'roles',
                through: models.Roles_Usuarios
            }],
        });

        res.json(usuariosConRoles);
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Error en el servidor'});
    }
};

module.exports = {
    login,
    obtenerUsuariosConRoles
}