
const jwt = require('jsonwebtoken')
const Users = require('../models/usuario')
isAuthenticated = (req, res, next) =>{
    const token = req.headers.authorization

    if(!token){
        return res.sendStatus(403)
    }
    jwt.verify(token,'mi-scret', (err,decoded)=>{
        const { _id } = decoded
        Users.findOne({ _id }).exec()
        .then(user =>{
            req.user = user
            next()
        })

    })
}

const hasRole = role => (req, res,next )=>{
    if(role.indexOf(req.user.role) > -1){
      return next()
    }
    res.sendStatus(403)
}

module.exports = {
    isAuthenticated,
    hasRole
}