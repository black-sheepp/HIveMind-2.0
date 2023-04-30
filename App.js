const express = require('express')
const App = express();
const Port = 8080;

App.use('/',require('./Routes'))

App.listen(Port,()=>{
    console.log("Server is Up and running on port", Port);
})