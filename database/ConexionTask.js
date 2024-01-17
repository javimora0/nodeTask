const Conexion = require('../database/Conexion')
const model = require('../models/index.js')
const conx = new Conexion()

class ConexionTask {
    insetarTarea = async (body) => {
        let resultado = 0
        conx.conectar()
        try {
            resultado = await model.Task.create(body)
        } catch (error) {
            throw error
        } finally {
            conx.desconectar()
        }
        return resultado
    }

    getTarea = async (id) => {
        conx.conectar()
        let resultado = await model.Task.findByPk(id)
        conx.desconectar()
        if (!resultado) {
            resultado = null
        }
        return resultado
    }

    getTareas = async () => {
        conx.conectar()
        let resultado = await model.Task.findAll()
        conx.desconectar()
        if (!resultado) {
            resultado = null
        }
        return resultado
    }
    deleteTarea = async (id) => {
        conx.conectar()
        let resultado = await model.Task.findByPk(id)
        if (resultado == null) {
            conx.desconectar()
            return null
        }
        await resultado.destroy()
        conx.desconectar()
        return resultado
    }

    updateTarea = async (body, id) => {
        conx.conectar()
        let resultado = await model.Task.findByPk(id)
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
}
module.exports = ConexionTask