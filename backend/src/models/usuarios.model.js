import { Schema, model } from 'mongoose';

const usuarioSchema = new Schema({
    nombre:{
        type: String,
        required:true,
        trim:true
    },apellido:{
        type: String,
        required:true,
        trim:true
    },fechaNacimiento:{
        type: String,
        required:true,
        trim:true
    },nombreUsuario:{
        type: String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type: String,
        required:true,
        trim:true
    },contrasenia:{
        type: String,
        required:true,
        bcrypt:true
    },
    rol:{
        type:String,
        default:'user',
        enum:['user','admin','proovedor']
    }
},{
    timestamps:true
});

export default model('usuario',usuarioSchema);