import { Router } from "express"; 
import type { Request, Response } from "express"; 
import MedicamentoController from "./controller/MedicamentoController.js";
import ClienteController from "./controller/ClienteController.js";
const router = Router(); 

router.get("/api", (req: Request, res: Response) => {
    res.status(200).json({ mensagem: "Olá, seja bem-vindo!" });
});

router.get("/api/medicamentos", MedicamentoController.todos);

router.post("/api/medicamentos", MedicamentoController.novo);

router.get("/api/medicamentos/:nome", MedicamentoController.medicamento);

router.get("/api/medicamentos/principio-ativo/:principio_ativo", MedicamentoController.principioativo);

router.get("/api/clientes", ClienteController.todos);

router.post("/api/clientes", ClienteController.novo);

router.get("/api/clientes/:cpf", ClienteController.cliente);

export { router }; // Exporta o roteador