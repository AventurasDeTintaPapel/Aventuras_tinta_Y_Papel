import { Router } from "express";

import {
  addToFav,
  getFavs,
  deleteFavs,
} from "../controllers/favorit.controllers.js";

export const favoritos = Router();
//add  to favorites
favoritos.post("/", addToFav);
//get favs
favoritos.get("/", getFavs);
//delete fav
favoritos.delete("/", deleteFavs);
