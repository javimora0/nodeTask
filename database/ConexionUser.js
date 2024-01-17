const Conexion = require('../database/Conexion')
const model = require('../models/index.js')
const models = require("../models");
const conx = new Conexion()

class ConexionUser {
    insertarUsuario = async (body) => {
        let resultado = 0
        conx.conectar()
        try {
            resultado = await model.User.create(body)
        } catch (error) {
            throw error
        } finally {
            conx.desconectar()
        }
        return resultado
    }

    // Si el usuario no existe devuelve null, si existe devuelve el usuario
    getUsuario = async (id) => {
        conx.conectar()

        let resultado = await model.User.findByPk(id)
        conx.desconectar()
        if (!resultado) {
            conx.desconectar()
            resultado = null
        }
        return resultado;
    }

    // Obtiene todos los usuarios pero tambien obtiene los roles
    getUsuarios = async () => {
        conx.conectar()

        let resultado = await model.User.findAll({include: []})
        if (!resultado) {
            conx.desconectar()
            resultado = null
        }
        conx.desconectar()

        return resultado;
    }

    // Si el usuario no existe devuelve null, si existe devuelve el usuario
    getUsuarioEmail = async (email) => {
        let resultado = 0
        conx.conectar()
        try {
            resultado = await model.user.findOne({
                where: {
                    email: email
                }
            })
            if (!resultado) {
                resultado = null;
            }
        } catch (error) {
            resultado = null
            conx.desconectar()
        }
        conx.desconectar()
        return resultado
    }

    deleteUsuario = async (id) => {
        conx.conectar()
        let resultado = await model.User.findByPk(id)
        if (!resultado) {
            conx.desconectar()
            throw error
        }
        await resultado.destroy()
        conx.desconectar()
        return resultado
    }

    updateUsuario = async (body, id) => {
        conx.conectar()
        let resultado = await model.User.findByPk(id)
        if (!resultado) {
            conx.desconectar()
        }
        try {
            await resultado.update(body)
        } catch (error) {
            conx.desconectar()
            throw error
        }
        conx.desconectar()
        return resultado
    }

    getUsuarioRegistrado = async(email, password) => {
        let resultado = 0
        conx.conectar()
        try {
            resultado = await model.User.findOne({
                where: {
                    email: email,
                    password: password
                }
            })
        } catch (error) {
            conx.desconectar()
            throw error;
        }
        conx.desconectar()
        return resultado;
    }

    tieneRol = async(id, rol) => {
        let resultado = 0
        conx.conectar()
        try{
            resultado = await model.Roles_Usuarios.findOne({
                where: {
                    id_rol: rol,
                    id_usuario:id
                }
            })

        }catch (error) {
            throw error
        }finally {
            conx.desconectar()
        }
        return resultado
    }

    getRolesUsuario = async(id, rol) => {
        let resultado = []
        conx.conectar()
        try {
            resultado = await models.User.findAll({
                where: {
                    id: id,
                },
                include: {
                    model: models.Rol,
                    as: 'roles',
                    through: models.Roles_Usuarios,
                    where: {
                        nombre: rol,
                    },
                },
            });
            return resultado[0].roles
        } catch (error) {
            return null
        }
    }
}

module.exports = ConexionUser