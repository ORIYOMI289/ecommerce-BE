const {role} = require('../middleware/role') ;
const users = require('../models/users') ;

exports.grantRoleAccess = function (action, resource) {
    return async (req, res, next) => {
        try{ 
            const permission = role.can(req.user.role)[action](resource) ;
            console.log(permission) 
            if(permission.granted) {
                next() 
            }
            else {
                return res.status(401).json({ err: "you can not perform this action" })
            }
        }
        catch (err) { res.status(400).send({err: err})}
    }
}

exports.allowIfLoggedin  = async (req, res, next) => {
    try {
        const accessId = req.params.adminId || req.params.id ;
        console.log(accessId)
        if (accessId) {
            const user = await users.findById(accessId);
            if (!user) return res.status(401).json({err: "you are not logged In"}) ;
            console.log(user) 
            req.user = user ;
            next() ;
        }
    }
    catch (err) {
        res.status(400).send(err)
    }
}