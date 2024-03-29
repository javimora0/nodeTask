'use strict';
const {genUsers} = require('../factories/userFactory')
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('users', [{
            nombre: 'root',
            email: 'root@root.com',
            password: await bcrypt.hash('root', 10),
            tareasCompletadas:0,
            createdAt: new Date(),
            updatedAt: new Date()
        }])
        await queryInterface.bulkInsert('roles_usuarios', [{
            id_rol: 1,
            id_usuario: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }])
        await queryInterface.bulkInsert('roles_usuarios', [{
            id_rol: 2,
            id_usuario: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }])
        const users = await genUsers(4)
        await queryInterface.bulkInsert('users', users, {});

    },

    async down(queryInterface, Sequelize) {

        await queryInterface.bulkDelete('users', null, {});

    }
};
