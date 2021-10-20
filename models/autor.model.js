const {Schema, model} = require('mongoose');

const AutorSchema = Schema({
    nombre:{
        type: String,
        require: true
    },
    apellido:{
        type: String,
        require: true
    },
    nacionalidad:{
        type: String,
        require: true,
    }
}, {collection:'autores'});
AutorSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model ('Autor', AutorSchema);