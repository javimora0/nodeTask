const Conexion = require('../database/Conexion')
const model = require('../models/index.js')
const conx = new Conexion()
class ConexionRol {
    getIdRol = async (rol) => {
        let resultado = 0
        conx.conectar()
        try{
            resultado = await model.Rol.findOne({
                where: {
                    nombre: rol
                }
            })

            if (!resultado) {
                resultado = null
            }
        }catch(error) {
            throw error
        }finally {
            conx.desconectar()
        }
        return resultado
    }

    rolExisteValidator = async (rol) => {
        let resultado = []
        conx.conectar()
        try {
            resultado = await model.Rol.find({where: {nombre: rol}})
        } catch (error) {
            console.log(`Aqui: ${error}`)
        } finally {
            conx.desconectar()
            if (resultado.length === 0) {
                throw new CustomError('Rol no existe');
            }
        }
        return resultado
    }
}

module.exports = ConexionRol