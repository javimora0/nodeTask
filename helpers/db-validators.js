const ConexionUser = require('../database/ConexionUser')
const ConexionTask = require('../database/ConexionRol')

const CustomError = require('./CustomError')
const {request} = require("express");

const emailExiste = (email = '') => {
    return new Promise((resolve, reject) => {
        const conx = new ConexionUser();
        conx.emailExisteValidator(email)
            .then(msg => {
                console.log('Existe');
                resolve(true);
            })
            .catch(err => {
                console.log('No existe');
                reject(new Error('Email existe'));
            });
    });
}

const rolExiste = (rol = '') => {
    return new Promise((resolve, reject) => {
        const conx = new ConexionTask();
        conx.rolExisteValidator(rol)
            .then(msg => {
                console.log('Existe');
                resolve(true);
            })
            .catch(err => {
                console.log('No existe');
                reject(new Error('Rol existe'));
            });
    });
}

const usuarioExiste = () => {
    return new Promise((resolve, reject) => {
        const conx = new ConexionUser();
        conx.usuarioExisteValidator()
            .then(msg => {
                console.log(msg);
                resolve(true);
            })
            .catch(err => {
                console.log(err);
                reject(new Error('Usuario existe'));
            });
    });
}


const idNoExiste = (id) => {
    return new Promise((resolve, reject) => {
        const conx = new ConexionUser();
        conx.idNoExisteValidator(id)
            .then(msg => {
                console.log(msg);
                resolve(true);
            })
            .catch(err => {
                console.log(err);
                reject(new Error('Usuario no existe'));
            });
    });
}
module.exports = {
    emailExiste,
    rolExiste,
    usuarioExiste,
    idNoExiste
}