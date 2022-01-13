const router = require('express').Router();
const {Product} = require('../controller/product') ;

router.post('/products/details', Product)

module.exports = router
