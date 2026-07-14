const express = require('express');
const cors = require('cors');
require('./config/db');
const patientRoutes = require('./routes/patient.routes');
const errorMiddleware = require('./middleware/error.middleware');
const app = express();

app.use(cors())
app.use(express.json());
app.use('/api', patientRoutes);
app.use(errorMiddleware);


app.get('/test', (req, res) => {
    res.json({ message: 'Funciona' });
});
module.exports = app;