const mongoose = require('mongoose');

(async ()=>{
    try{
        const db = await mongoose.connect('mongodb://localhost/aventura')
        console.log('la coneccion fue exitosa')
    }catch(error){
        console.log(error)
    }
})();

module.exports = mongoose;