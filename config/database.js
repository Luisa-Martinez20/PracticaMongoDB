const mongoose = require('mongoose');

const dbConection = async() => {
	try {
        //usar la cadena de conexión que tenemos en mongocompass
		//Debemos utilizar la cadena de conexion que tenemos en mongocompass
		// mongodb+srv://adminproject:8PrubypD5opKM39P@cluster0.w5dke.mongodb.net/projectosdb
		await mongoose.connect(process.env.DB_CNN );
		console.log('Conexion exitosa a la BD')
	} catch (error) {
		console.log(error);
		throw new Error('Error al conectar a la BD');
	}
	
}
module.exports ={   //para exportar
	dbConection
}