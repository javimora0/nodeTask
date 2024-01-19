const Conexion = require('../database/Conexion')
const model = require('../models/index.js')
const models = require("../models");
const {params} = require("express/lib/request");
const {request} = require("express");
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
            resultado = null
        }
        return resultado;
    }

    // Obtiene todos los usuarios pero tambien obtiene los roles
    getUsuarios = async () => {
        conx.conectar()

        let resultado = await model.User.findAll({include: []})
        conx.desconectar()
        if (!resultado) {
            resultado = null
        }
        return resultado;
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
            throw error
        }
        try {
            await resultado.update(body)
        } catch (error) {
            throw error
        }finally {
            conx.desconectar()
        }
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

    usuarioExisteValidator = async() => {
        let resultado = [];
        conx.conectar();
        try {
            resultado = await model.User.find({where: {id: request.params.id}})
        } catch (error) {
            console.log(`Aquí: ${error} `)
        } finally {
            conx.desconectar();
            console.log(`Res: ${resultado.length}`)
            if (resultado.length !== 0){
                throw new CustomError('Usuario existe');
            }
        }
        return resultado;
    }

    idNoExisteValidator = async(id) => {
        let resultado = [];
        conx.conectar();
        try {
            resultado = await model.User.findOne({where: {id: id}})
        } catch (error) {
            console.log(`Aquí: ${error} `)
        } finally {
            conx.desconectar();
            console.log(`Res: ${resultado.length}`)
            if (resultado.length === 0){
                throw new CustomError('Usuario no existe');
            }
        }
        return resultado;
    }

    emailExisteValidator = async (email) => {
        let resultado = [];
        conx.conectar();
        try {
            resultado = await model.User.find({where: {email: email}})
        } catch (error) {
            console.log(`Aquí: ${error} `)
        } finally {
            conx.desconectar();
            console.log(`Res: ${resultado.length}`)
            if (resultado.length !== 0){
                throw new CustomError('Email existe');
            }
        }
        return resultado;
    }

    changePassword = async (new_password, idUsuario) => {
        let user = 0
        conx.conectar()
        user = await model.User.findByPk(idUsuario)
        user.password = new_password
        try {
            user.save()
        } catch (error) {
            throw error
        } finally {
            conx.desconectar()
        }
        return user
    }
    getUsuarioPassword = async (old_password, id) => {
        let user = 0
        conx.conectar()
        user = await model.User.findByPk(id)
        if (user.password !== old_password || !user){
            user = null
        }

        return user
    }

}
module.exports = ConexionUser