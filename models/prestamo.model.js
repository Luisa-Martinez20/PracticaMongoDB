const {Schema, model} = require('mongoose');

const PrestamoSchema = Schema({
    fechaPrestamo:{
        type: String,
        require: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    libro: {
        type: Schema.Types.ObjectId,
        ref: 'Libro',
        required: true
    }
    
},{collection:'prestamos'});

PrestamoSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model ('Prestamo', PrestamoSchema);