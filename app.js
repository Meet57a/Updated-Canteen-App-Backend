const express = require('express');
const body_parser = require('body-parser');
const AuthRouter = require('./router/auth');


const app = express(); 
app.use(body_parser.json({
    limit: '50mb'
}));  

app.use('/',AuthRouter);

module.exports = app;