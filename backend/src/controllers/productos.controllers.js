import productos from '../models/productos.model.js';
import mongoose from 'mongoose';
export const obtenerProducto= async(req,res)=>{
    try {
        const { id } = req.params;
        const obtenerProducto = (id === undefined) 
            ? await productos.find() 
            : await productos.findOne({ _id: id });
        res.json(obtenerProducto);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'error interno del servidor' });
    }

}
export const cargarProducto = async(req,res)=>{
    try {
        const { titulo, autor, descripcion, numeroEdicion, tipo, idioma, precio, cantidad, categoria } = req.body;

        // Validación básica
        if (!titulo || !autor || !descripcion || !numeroEdicion || !tipo || !idioma || !precio || !cantidad || !categoria) {
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
            titulo,
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
export const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await productos.findByIdAndDelete(id);

        if (resultado) {
            res.status(200).json({ msg: 'Producto eliminado correctamente' });
        } else {
            res.status(404).json({ msg: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el producto' });
    }

};
export const editarProducto=async(req,res)=>{
    try{
        const { titulo, autor, descripcion, numeroEdicion, tipo, idioma, precio, cantidad, categoria } = req.body;
        //productos editado
        const productoEditado = ({
            titulo,
            autor,
            descripcion,
            numeroEdicion,
            tipo,
            idioma,
            precio,
            cantidad,
            categoria,
        });

        const{id} = req.params;
        const resultado= await productos.findByIdAndUpdate(id,productoEditado,{new:true});
        if (resultado) {
            res.status(200).json({ msg: 'Producto actualizado correctamente' });
        } else {
            res.status(404).json({ msg: 'Producto no encontrado' });
        }
    }catch(error){
        console.error(error);
        res.status(500).json({ msg: 'Error al eliminar el producto' });
    }
}
export const obtCate = async (req, res) => {
    try {
        const {type} = req.params;
        const resultado = await productos.find({ tipo: type });
        res.status(200).json(resultado);
    } catch (error) {
        console.error('Error al obtener libros:', error);
        res.status(500).json({ message: 'Error al obtener libros' });
    }
};
