const express = require('express') ;
const mongoose = require('mongoose') ;

const auth = require('./routes/auth') ;
const user = require('./routes/user') ;
const products = require('./routes/product')
const cart = require('./routes/cart')
const order = require('./routes/order')

const app = express() ;
app.use(express.json()) ;
app.use('/auth', auth) ; 
app.use('/users', user) ;
app.use('/products', products) ;
app.use('/cart', cart) ;
app.use('/order', order) ;

 const { mongodbProduction, mongoLocalhost } = process.env ;

require('dotenv').config() ;
mongoose.connect(mongoLocalhost, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( () => console.log('successfully connected!'))
.catch( err => console.log(err)) ;

const port = process.env.PORT || 5001 
app.listen(port, ()=> {
    console.log(`server is connected to port ${port}`)
}) ;