'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.STRING
      },
      dificultad: {
        type: Sequelize.STRING
      },
      horas_previstas: {
        type: Sequelize.INTEGER
      },
      horas_realizadas: {
        type: Sequelize.INTEGER
      },
      porcentaje: {
        type: Sequelize.INTEGER
      },
      completada: {
        type: Sequelize.INTEGER
      },
      id_usuario:{
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName:'users'
          },
          key: 'id'
        },
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};