const jwt = require('jsonwebtoken')
const {response, request} = require('express')

const validarJWT = (req, res, next) => {
    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({'msg':'No hay token en la peticion'})
    }

    try {
        const {uid, rol} = jwt.verify(token, process.env.secretOrPrivateKey)
        if (rol === "programador") {
            next()
        }else {
            res.status(400).json({'msg':'Acceso no autorizado'})
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({'msg':'Token no valido'})
    }
}

module.exports = {
    validarJWT
}