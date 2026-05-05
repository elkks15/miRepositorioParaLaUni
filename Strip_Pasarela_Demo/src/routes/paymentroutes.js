import { Router } from "express";
import { procesarPago } from "../controllers/pagoController.js";

const router = Router();

router.post("/pagar", procesarPago);

router.get("/exito", (req, res) => {
    res.send("pago exitoso");
});

router.get("/cancelado", (req,res)=>{
    res.send("pago cancelado");
});

export default router;

