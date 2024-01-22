const ConexionUser = require('../database/ConexionUser')
const ConexionRol = require('../database/ConexionRol')

const CustomError = require('./CustomError')
const {request} = require("express");

const emailExiste = (email = '') => {
    return new Promise((resolve, reject) => {
        const conx = new ConexionUser();
        conx.emailExisteValidator(email)
            .then(msg => {
                resolve(true);
            })
            .catch(err => {
                reject(new Error('Email existe'));
            });
    });
}


const rolExiste = (rol = '') => {
    return new Promise((resolve, reject) => {
        const conx = new ConexionRol();
        conx.rolExisteValidator(rol)
            .then(msg => {
                resolve(true);
            })
            .catch(err => {
                reject(new Error('Rol no existe'));
            });
    });
}

const usuarioExiste = () => {
    return new Promise((resolve, reject) => {
        const conx = new ConexionUser();
        conx.usuarioExisteValidator()
            .then(msg => {
                resolve(true);
            })
            .catch(err => {
                reject(new Error('Usuario existe'));
            });
    });
}


const idNoExiste = (id) => {
    return new Promise((resolve, reject) => {
        const conx = new ConexionUser();
        conx.idNoExisteValidator(id)
            .then(msg => {
                resolve(true);
            })
            .catch(err => {
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