const productos = require('../models/productos.model');

const ctrl = {}
ctrl.obtenerProducto= async(req,res)=>{
    try{
       const {id}= req.params
       const obtenerProducto = (id === undefined)? await productos.find():await productos.findOne(id);
    //    return res.status(200).json({data:obtenerProducto})
            res.json(obtenerProducto)
    }catch(error){
        console.log(error)
        return res.status(500).json({msg:'error interno del servidor'})
     
    }
}

ctrl.cargarProducto = async(req,res)=>{
    try {
        const { nombre, autor, descripcion, numeroEdicion, tipo, idioma, precio, cantidad, categoria } = req.body;

        // Validación básica
        if (!nombre || !autor || !descripcion || !numeroEdicion || !tipo || !idioma || !precio || !cantidad || !categoria) {
            return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
        }

        // Verificar si se subió una imagen
        let imagen = '';
        if (req.file) {
            imagen = '/uploads/' + req.file.filename;
        } else {
            return res.status(400).json({ msg: 'La imagen es obligatoria' });
        }

        // Crear un nuevo producto
        const newProduct = new productos({
            nombre,
            autor,
            descripcion,
            numeroEdicion,
            tipo,
            idioma,
            precio,
            cantidad,
            categoria,
            imagen
        });

        // Guardar el producto en la base de datos
        await newProduct.save();
        return res.status(200).json({ msg: 'Producto guardado correctamente' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error al guardar el producto' });
    }


}
module.exports= ctrl;