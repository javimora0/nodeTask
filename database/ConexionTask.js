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
            return null
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
        let resultado = 0
        conx.conectar()
        try {
            resultado = await model.Task.update({
                    descripcion: body.descripcion,
                    dificultad: body.dificultad,
                    horas_previstas: body.horas_previstas,
                    horas_realizadas: body.horas_realizadas,
                    porcentaje: body.porcentaje,
                    completada: body.completada,
                    id_usuario: body.id_usuario
                },
                {
                    where: {id: id}
                })
        } catch (error) {
            return null
        } finally {
            conx.desconectar()
        }
        return resultado
    }

    getTareasDisponibles = async () => {
        conx.conectar()
        let tareas = await model.Task.findAll({
            where: {
                id_usuario: null,
                completada: 0
            }
        })
        if (!tareas) {
            tareas = null
        }
        conx.desconectar()
        return tareas
    }
    asignarTarea = async (idTarea, idUsuario) => {
        conx.conectar()
        let tarea = 0
        try {
            tarea = await model.Task.update({id_usuario: idUsuario}, {
                where: {
                    id: idTarea
                },
            })

        } catch (error) {
            throw error
        } finally {
            conx.desconectar()
        }
        return tarea
    }

    getTareasUsuario = async (idUsuario) => {
        conx.conectar()
        let tareas = []
        tareas = await model.Task.findAll({where: {id_usuario: idUsuario}})
        conx.desconectar()
        return tareas
    }

    getTareaUsuario = async (idUsuario, idTarea) => {
        conx.conectar()
        let tareas = []
        tareas = await model.Task.findOne({where: {id_usuario: idUsuario, id: idTarea}})
        conx.desconectar()
        return tareas
    }

    getTareasCompletadas = async () => {
        conx.conectar()
        let tareas = []
        tareas = await model.Task.findAll({
            where: {
                completada: 1
            }
        })
        conx.desconectar()
        return tareas
    }

    getTareasPendientes = async () => {
        conx.conectar()
        let tareas = []
        tareas = await model.Task.findAll({
            where: {
                completada: 0
            }
        })
        conx.desconectar()
        return tareas
    }
}


module.exports = ConexionTask