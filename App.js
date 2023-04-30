const express = require('express')
const App = express();
const Port = 8080;
const expressLayouts = require('express-ejs-layouts');

App.set('view engine', 'ejs');

App.use(express.static('./Assets'))
App.use(expressLayouts);






App.use('/',require('./Routes'))

App.listen(Port,()=>{
    console.log("Server is Up and running on port", Port);
})
