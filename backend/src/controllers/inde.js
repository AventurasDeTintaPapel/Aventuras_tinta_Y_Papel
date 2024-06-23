const bcrypt = require('bcrypt');

const plainPassword = '123';
const saltRounds = 10;

// Función para encriptar la contraseña
const encryptPassword = async (password) => {
    try {
        // Generar un salt
        const salt = await bcrypt.genSalt(saltRounds);
        // Usar el salt para hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (err) {
        console.error('Error encrypting password:', err);
    }
};

// Función para comparar la contraseña en texto plano con la encriptada
const comparePassword = async (plainPassword, hashedPassword) => {
    try {
        // Comparar la contraseña en texto plano con el hash almacenado
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match;
    } catch (err) {
        console.error('Error comparing password:', err);
    }
};

// Proceso de prueba
const testEncryption = async () => {
    const hashedPassword = await encryptPassword(plainPassword);
    console.log('Hashed password:', hashedPassword);

    const isMatch = await comparePassword(plainPassword, hashedPassword);
    if (isMatch) {
        console.log('Password match!');
    } else {
        console.log('Password does not match');
    }
};

testEncryption();
