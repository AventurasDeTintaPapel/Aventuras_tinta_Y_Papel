import productos from "../models/productos.model.js";

//add start of the product

export const addStar = async (req, res) => {
  const { idProduct, star, idUser } = req.body;
  try {
    const prodFind = await productos.findById(idProduct);

    if (!prodFind) {
      res.status(404).json({ msg: "product not find" });
    }

    const fStar = prodFind.stars[star];
    console.log(fStar, star);

    res.json({ msg: "star", prodFind });
  } catch (error) {
    console.log("Internal server error", error);
    res.status(500).json({ msg: "Internal server error", error });
  }
};
