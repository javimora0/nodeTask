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

        if (idRol == null) {
            return res.status(500).json({ msg: 'Rol incorrecto' });
        }

        const roles = await rolesUsuario(user.id);
        let tieneRol = false
        roles.forEach( (roles) => {
            console.log(roles.nombre, rol)
            if (roles.nombre === rol){
                tieneRol = true
            }
        })

        if (!tieneRol) {
            return res.status(500).json({ msg: `No tiene roles` });
        }

        const token = generarJWT(user.id, rol);
        return res.status(200).json({ msg: 'Login correcto', data: user, token: token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error en el servidor', error: error });
    }
};


const rolesUsuario = async (id) => {
    try {
        const usuariosConRoles = await models.User.findAll({
            where: {
                id: id
            },
            include: models.Rol,
        });

        return usuariosConRoles[0].Rols
    } catch (error) {
        return null
    }
}

const obtenerUsuariosConRoles = async (req, res) => {
    try {
        const usuariosConRoles = await models.User.findAll({
            where: {
              id: req.params.id
            },
            include: models.Rol,
        });

        res.json(usuariosConRoles[0].Rols);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};



module.exports = {
    login,
    obtenerUsuariosConRoles
}