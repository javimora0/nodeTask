const Conexion = require('../database/Conexion')
const model = require('../models/index.js')
const conx = new Conexion()

class ConexionRolUsuario {
    asignarRol = async (idUsuario, idRol) => {
        let resultado = 0
        conx.conectar()
        try {
            resultado = await model.Roles_Usuarios.create({
                id_usuario:idUsuario,
                id_rol: idRol
            })
        } catch (error) {
            throw error
        }finally {
            conx.desconectar()
        }
        return resultado
    }
}

module.exports = ConexionRolUsuario