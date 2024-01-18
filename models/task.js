'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Task extends Model {

        static associate(models) {
        }
    }

    Task.init({
        descripcion: DataTypes.STRING,
        dificultad: DataTypes.STRING,
        horas_previstas: DataTypes.INTEGER,
        horas_realizadas: DataTypes.INTEGER,
        porcentaje: DataTypes.INTEGER,
        completada: DataTypes.INTEGER,
        id_usuario: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Task',
        tableName: 'tasks'
    });
    return Task;
};