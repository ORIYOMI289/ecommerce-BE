const express = require('express') ;
const mongoose = require('mongoose')
// const bodyParser = require('body-parser') ;

const auth = require('./routes/auth') ;
const user = require('./routes/user') ;

const app = express() ;
app.use(express.json()) ;
app.use('/auth', auth) ;
app.use('/users', user) ;

// const test = require('./routes/test') ;
// app.use('/', test) ;

require('dotenv').config() ;
mongoose.connect(process.env.mongoLocalhost, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( () => console.log('successfully connected!'))
.catch( err => console.log(err)) ;



const port = process.env.PORT || 5001
app.listen(port, ()=> {
    console.log('server is running')
}) ;