const express = require('express');
const app = express();
const cors = require('cors');

require('./database');
app.use(cors()); // agrega cabecera a la petecion para poder ser pasados a esta peticion
app.use(express.json()); // convierte los datos que recibe el js a un formato que pueda modificar
app.use('/api', require('./routes/index'));
app.listen(process.env.PORT || 3000); // 3000
//console.log('server on port', 3000);