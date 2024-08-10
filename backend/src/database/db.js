import mongoose from 'mongoose';

(async ()=>{
    try{
         const db = await connect('mongodb://localhost/aventura')
        console.log('la coneccion fue exitosa')
    }catch(error){
        console.log(error)
    }
})();

export default {mongoose}
