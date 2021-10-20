const {Schema, model} = require('mongoose');

const LibroSchema = Schema({
    nombre:{
        type: String,
        require: true
    },
    fechaLanzamiento:{
        type: String,
        require: true
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Autor',
        required: true
    },
    editorial: {
        type: Schema.Types.ObjectId,
        ref: 'Editorial',
        required: true
    },

}, {collection:'libros'});

LibroSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject();
    return object;
})

module.exports = model ('Libro',LibroSchema);