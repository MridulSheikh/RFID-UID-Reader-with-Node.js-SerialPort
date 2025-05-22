const express = require('express');
const cors = require('cors');
const rfidRoutes = require('./routes/rfidRoutes')
const employeRoutes = require('./routes/employeRoutes')

const app = express();
app.use(cors());
app.use(express.json());

// Example API endpoint
app.get('/ping', (req, res) => res.send('pong'));
app.use('/rfid', rfidRoutes);
app.use("/employees", employeRoutes);

module.exports = app;
