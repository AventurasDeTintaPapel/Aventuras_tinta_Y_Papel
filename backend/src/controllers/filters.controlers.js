import productos from "../models/productos.model.js";

export const autFilter = async (req, res) => {
  const { query } = req.query; // 'libros' en tu caso

  try {
    const result = await productos.aggregate([
      {
        $search: {
          text: {
            query: query,
            path: ["autor", "titulo", "descripcion", "categoria", "idioma", "tipo"],
            fuzzy: { maxEdits: 1 },
          },
        },
      },
    ]);

    // Verificar si se encontraron resultados
    if (result.length === 0) {
      return res.status(404).json({ msg: "No se encontraron resultados" });
    }

    res.json(result);
  } catch (error) {
    console.log("Error en autFilter:", error.message);
    res.status(500).json({ msg: "error interno del servidor", error });
  }
};
