const Conexion = require('../database/Conexion')
const model = require('../models/index.js')
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

    getUsuarios = async () => {
        conx.conectar()
        let resultado = await model.User.findAll()
        conx.desconectar()
        if (!resultado) {
            conx.desconectar()
            resultado = null
        }
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
            throw error
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


}

module.exports = ConexionUser