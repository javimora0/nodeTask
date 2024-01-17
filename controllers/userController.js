const {response, request} = require('express')
const Conexion = require('../database/ConexionUser');
const conx = new Conexion()

const crearUsuario = (req = request, res = response) => {
    conx.insertarUsuario(req.body)
        .then(msg => {
            res.status(200).json({'success': true, 'usuario':msg})
        })
        .catch(err => {
            res.status(203).json(err)
        })
}

const modificarUsuario = (req = request, res = response) => {
    conx.updateUsuario(req.body, req.params.id)
        .then(msg => {
            res.status(200).json({'success': true, 'usuario':msg})
        })
        .catch(err => {
            res.status(203).json(err)
        })
}

const obtenerUsuario = (req = request, res = response) => {
    conx.getUsuario(req.params.id)
        .then(msg => {
            res.status(200).json(msg)
        })
        .catch(err => {
            res.status(203).json(err)
        })
}

const obtenerUsuarios = (req = request, res = response) => {
    conx.getUsuarios()
        .then(msg => {
            res.status(201).json(msg)
        })
        .catch(err => {
            res.status(203).json(err)
        })
}

const borrarUsuario = (req = request, res = response) => {
    conx.deleteUsuario(req.params.id)
        .then(msg => {
            res.status(200).json(msg)
        })
        .catch(err => {
            res.status(203).json(err)
        })
}
module.exports = {
    crearUsuario,
    obtenerUsuario,
    obtenerUsuarios,
    borrarUsuario,
    modificarUsuario
}