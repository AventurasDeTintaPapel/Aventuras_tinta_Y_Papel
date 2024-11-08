import { Router } from "express";
import { captOrder, createOrder } from "../controllers/payment.controllers.js";
export const payrouter = Router();

payrouter.get("/create-order", createOrder);
payrouter.post("/create-order", createOrder);

payrouter.get("/", (req, res) => {
  res.send("hello");
});
payrouter.get("/cancel-order", (req, res) => {
  res.json({ msg: "peticion cancelada" });
});
