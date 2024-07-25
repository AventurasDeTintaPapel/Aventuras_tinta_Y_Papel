const {Schema,model}= require('mongoose');
const favoritos = new Schema({
    producto:{
        type: Schema.Types.ObjectId
    },usuario:{
        type: Schema.Types.ObjectId, ref: 'usuarios',
    }
})
module.exports= model ('favoritos',favoritos);