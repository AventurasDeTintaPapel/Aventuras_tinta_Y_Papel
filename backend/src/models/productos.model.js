const {Schema,model}= require('mongoose');

const productosSchema = new Schema({
    titulo:{
        type:String,
        required:true,
        trim:true
    },autor:{
        type:String,
        required:true,
        trim:true
    },descripcion:{
        type:String,
        required:true,
        trim:true
    },tipo:{
        type:String,
        required:true,
        trim:true
    },idioma:{
        type:String,
        required:true,
        trim:true
    },categoria:{
        type:String,
        required:true,
        trim:true
    },numeroEdicion:{
        type:Number,
        required:true,
        trim:true
    },precio:{
        type:Number,
        required:true,
        trim:true
    },cantidad:{
        type:Number,
        required:true,
        trim:true
    },imagen:{
        type:String,
        required:true,
    }
},{
    timestamps:true
}) ;
module.exports = model('productos',productosSchema)
