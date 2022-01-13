
const { userUpdate, getUsers, User, deleteUser } = require('../controller/user')
const access = require('../middleware/accessLoginRole')

const router = require('express').Router() ;

router.put('/:id', access.allowIfLoggedin, access.grantRoleAccess('updateOwn', 'profile'), userUpdate) ;

router.get('/getUsers/:id', access.allowIfLoggedin, access.grantRoleAccess('readAny', 'profile'), getUsers) ;

router.get('/getUser/:adminId/:id', access.allowIfLoggedin, access.grantRoleAccess('readAny', 'profile'), User) ;

router.delete('/deleteUser/:adminId/:id', access.allowIfLoggedin, access.grantRoleAccess('deleteAny', 'profile'),  deleteUser) ;

module.exports = router ; 