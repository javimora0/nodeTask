const bcrypt = require('bcrypt');
const { faker, fakerES } = require('@faker-js/faker');

const genUsers = async (ctos = 1) => {

    let usersGen = []
    for(let i = 1; i <= ctos; i++) {
        let u =
            {
                nombre: fakerES.person.firstName(),
                email: fakerES.internet.email(),
                password: bcrypt.hash('1234', 10),
                createdAt: new Date(),
                updatedAt: new Date()
            }
        usersGen.push(u)
    }
    return Promise.all(usersGen);
}

module.exports = {
    genUsers
}
