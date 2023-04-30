const express = require('express')
const App = express();
const Port = 8080;
const expressLayouts = require('express-ejs-layouts');
const db = require('./Config/mongoose')
const bodyParser = require('body-parser')



App.set('view engine', 'ejs');

App.use(express.static('./Assets'))
App.use(expressLayouts);
App.use(bodyParser.urlencoded({ extended: false }))







App.use('/',require('./Routes'))

App.listen(Port,()=>{
    console.log("Server is Up and running on port", Port);
})
