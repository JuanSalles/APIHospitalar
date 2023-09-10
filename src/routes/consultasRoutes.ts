import express from "express";
import ConsultaController from "../controllers/ConsultaController";

const routes = express.Router();

routes.get("/consultas", ConsultaController.listarConsultas);

routes.get("/consultas/:id", ConsultaController.listarConsultaById);

routes.post("/consultas", ConsultaController.adicionaConsulta);

routes.put("/consultas/:id", ConsultaController.editarConsultaPorId);

routes.delete("/consultas/:id", ConsultaController.deletarConsultaPorId);

export default routes