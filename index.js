const express = require('express'); //sitaxis de importaciòn node
require('dotenv').config();
const{ dbConection } = require('./config/database');
const cors = require('cors'); //forma de importar

//Crear el servidor express
const app = express();

//configurar cors

app.use(cors()); //aceptar cualquier peticiòn de cualquier servidor

app.use(express.json());

//Estableciendo conexión a la BD
dbConection();

//Verificando variables de entorno
//console.log(process.env);

//Rutas de la API Proyectos 
app.use('/api/usuarios',require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/editorial', require('./routes/editoriales.routes'));
app.use('/api/autores', require('./routes/autores.routes'));
app.use('/api/libros', require('./routes/libros.routes'));
app.use('/api/prestamos', require('./routes/prestamos.routes'));


//Còdigo para desplegar el servidor
app.listen(process.env.PORT,()=>{
    console.log('Servidor Nodejs desplegado en el puerto: '+ process.env.PORT )
})