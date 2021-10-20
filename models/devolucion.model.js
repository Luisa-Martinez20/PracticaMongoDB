const {Schema, model} = require('mongoose');

const DevolucionSchema = Schema({
    fechaDevolucion:{
        type: datetime,
        require: true,
    }
},{collection: 'devoluciones'});

DevolucionSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model ('Devolucion', DevolucionSchema);