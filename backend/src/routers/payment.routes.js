import { Router } from "express";
import { captOrder, createOrder } from "../controllers/payment.controllers.js";
import { validateJwt } from "../../middlewares/session.js";
export const payrouter = Router();

payrouter.get("/create-order", validateJwt, createOrder);
payrouter.post("/create-order", validateJwt, createOrder);

payrouter.post("/capture-order", captOrder);
payrouter.get("/capture-order", captOrder);

payrouter.get("/", (req, res) => {
  res.send("hello");
});
payrouter.get("/cancel-order", (req, res) => {
  res.json({ msg: "peticion cancelada" });
});
