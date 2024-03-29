const Conexion = require('../database/Conexion')
const model = require('../models/index.js')
const {request} = require("express");
const bcrypt = require("bcrypt");
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
        } finally {
            conx.desconectar()
        }
        return resultado
    }

    getUsuarioRegistrado = async (email, password) => {
        let resultado = 0
        conx.conectar()
        try {
            resultado = await model.User.findOne({
                where: {
                    email: email
                }
            })
            if (!resultado) {
                return null
            }
            let passwordCorrecta = await bcrypt.compare(password, resultado.password)
            if (!passwordCorrecta) {
                return null
            }
        } catch (error) {
            conx.desconectar()
            throw error;
        }
        conx.desconectar()
        return resultado;
    }

    getRolesUsuario = async (id, rol) => {
        let resultado = []
        conx.conectar()
        try {
            resultado = await model.User.findAll({
                where: {
                    id: id,
                },
                include: {
                    model: model.Rol,
                    as: 'roles',
                    through: model.Roles_Usuarios,
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

    usuarioExisteValidator = async () => {
        let resultado = [];
        conx.conectar();
        try {
            resultado = await model.User.find({where: {id: request.params.id}})
        } catch (error) {
            console.log(`Aquí: ${error} `)
        } finally {
            conx.desconectar();
            console.log(`Res: ${resultado.length}`)
            if (resultado.length !== 0) {
                throw new CustomError('Usuario existe');
            }
        }
        return resultado;
    }

    idNoExisteValidator = async (id) => {
        let resultado = [];
        conx.conectar();
        try {
            resultado = await model.User.findOne({where: {id: id}})
        } catch (error) {
            console.log(`Aquí: ${error} `)
        } finally {
            conx.desconectar();
            console.log(`Res: ${resultado.length}`)
            if (resultado.length === 0) {
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
            if (resultado.length !== 0) {
                throw new CustomError('Email existe');
            }
        }
        return resultado;
    }

    changePassword = async (body, idUsuario) => {
        let user = 0
        conx.conectar()
        user = await model.User.findOne({where: {id: idUsuario}})
        if (!user) {
            return null
        }
        let resultado = await bcrypt.compare(body.old_password, user.password)
        if (!resultado) {
            return null
        }
        user.password = await bcrypt.hash(body.new_password, 10)
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
        if (user.password !== old_password || !user) {
            user = null
        }

        return user
    }

    getUsuarioEmail = async (email) => {
        return await model.User.findOne({where: {email: email}})
    }

    establecerPassword = async (usuario, newPassword) => {
        let resultado = 0
        conx.conectar()
        usuario.password = await bcrypt.hash(newPassword, 10)
        try {
            resultado = usuario.save()
        } catch (error) {
            throw error
        } finally {
            conx.desconectar()
        }
        return resultado
    }

    sumarTareaCompletada = async (idUsuario) => {
        let usuario = 0
        conx.conectar()
        usuario = await model.User.findByPk(idUsuario)
        usuario.tareasCompletadas ++
        try {
            usuario.save()
        } catch (error) {
            throw error
        } finally {
            conx.desconectar()
        }
        return usuario
    }

    ranking = async () => {
        let ranking = 0
        conx.conectar()
        try {
            ranking = await model.User.findAll({
                order: [
                    ['tareasCompletadas', 'DESC']
                ]
            });
            console.log(ranking);
        } catch (error) {
            console.error(error);
        }
        conx.desconectar()
        return ranking
    }
}

module.exports = ConexionUser