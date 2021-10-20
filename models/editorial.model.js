const {Schema, model} = require('mongoose');

const EditorialSchema = Schema({
    nombre:{
        type: String,
        require: true
    }
}, {collection:'editoriales'});

EditorialSchema.method('toJSON', function(){
    const {__v, ...object } = this.toObject();
    return object;
})

module.exports = model ('Editorial', EditorialSchema);