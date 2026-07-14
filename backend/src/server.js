const express = require('express');
require('./config/db');

const app = require('./app')

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Funciono el ${PORT}`)
})