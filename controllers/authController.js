const { response , request} = require('express')
const Conexion = require('../database/ConexionUser')
const ConexionRol = require('../database/ConexionRol')
const models = require('../models/index')

const {generarJWT} = require("../helpers/generate_jwt");

const login = async (req, res = response) => {
    const { email, password, rol } = req.body;

    try {
        const conx = new Conexion();
        const conxRol = new ConexionRol();
        const user = await conx.getUsuarioRegistrado(email, password);
        const idRol = await conxRol.getIdRol(rol);

        //En caso de que el rol que solicita no exista
        if (idRol == null) {
            return res.status(500).json({ msg: 'Rol incorrecto' });
        }

        const tieneRol = await conx.tieneRol(user.id, idRol);
        if (tieneRol === null) {
            return res.status(500).json({ msg: `No tiene rol` });
        }

        if (user) {
            const token = generarJWT(user, rol);
            return res.status(200).json({ msg: 'Login correcto', data: user, token: token });
        } else {
            return res.status(500).json({ msg: 'Login incorrecto', error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error en el servidor', error: error });
    }
};

const obtenerUsuariosConRoles = async (req, res) => {
    try {
        const usuariosConRoles = await models.User.findAll({
            include: models.Rol,
        });

        res.json(usuariosConRoles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

module.exports = {
    login,
    obtenerUsuariosConRoles
}