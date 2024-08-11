import mongoose from 'mongoose';

(async ()=>{
    try{
        const db = await mongoose.connect('mongodb+srv://jaquibatienza22:AventuraAtienzaJaqueline@cluster0.uhc28.mongodb.net/Aventura', {
        });
        console.log('La conexión fue exitosa');
    }catch(error){
        console.log(error)
    }
})();

export default {mongoose}
