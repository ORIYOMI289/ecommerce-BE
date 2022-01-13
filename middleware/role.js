const accessControl = require('accesscontrol');
const ac = new accessControl() ;

exports.role = (function () {
    ac.grant('basic')
        .readOwn('profile')
        .updateOwn('profile') ;
    
    ac.grant('admin')
        .extend('basic')
        .readAny('profile')
        .updateOwn('profile') 
        .deleteAny('profile') ;

        return ac ;
})()