const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
     host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

pool.connect()
    .then(()=>{
        console.log('conecto correctamente la base de datos')
    })
    .catch((error)=>{
        console.error('no sirvio la base de datos', error.message);
    })

    module.exports = pool;