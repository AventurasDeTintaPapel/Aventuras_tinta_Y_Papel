//models/user.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    nombreUsuario: { type: String, required: true, unique: true },
    contrasenia: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

export default User;