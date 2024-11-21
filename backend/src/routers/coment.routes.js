import { Router } from "express";
import { creatcoment, delComent, getComent, updaComent } from "../controllers/coment.cotroller.js";
import { validateJwt } from "../../middlewares/session.js";
export const comentRouter = Router();

comentRouter.put("/", validateJwt, creatcoment);
comentRouter.put('/update',validateJwt, updaComent)
comentRouter.delete('/delete',validateJwt, delComent);
comentRouter.get('/getComent',validateJwt,getComent)
