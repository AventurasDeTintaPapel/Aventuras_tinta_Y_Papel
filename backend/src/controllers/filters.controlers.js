import productos from "../models/productos.model.js";

export const autFilter = async (req, res) => {
  const { query, categoria } = req.query; // 'libros' en tu caso

  try {
    const pipeline = [
      {
        $search: {
          text: {
            query: query,
            path: [
              "autor",
              "titulo",
              "descripcion",
              "categoria",
              "idioma",
              "tipo",
            ],
            fuzzy: { maxEdits: 1 },
          },
        },
      },
    ];

    if (categoria) {
      pipeline.push({
        $match: { categoria: categoria },
      });
    }

    const result = await productos.aggregate(pipeline);
    if (result.length === 0) {
      return res.status(404).json({ msg: "No se encontraron resultados" });
    }

    res.json(result);
  } catch (error) {
    console.log("Error en autFilter:", error);
    res.status(500).json({ msg: "error interno del servidor", error });
  }
};
