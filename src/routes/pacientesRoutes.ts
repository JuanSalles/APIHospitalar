import express from "express";
import PacienteController from "../controllers/PacienteController";

const routes = express.Router();

routes.get("/pacientes", PacienteController.listarPacientes);

routes.get("/pacientes/:id", PacienteController.listarPacienteById);

routes.post("/pacientes/finalDaConsulta", PacienteController.finalizarConsultaById);

routes.post("/pacientes", PacienteController.adicionaPaciente);

routes.put("/pacientes/cadastrarConsulta/:id", PacienteController.cadastrarConsultaById);

routes.put("/pacientes/:id", PacienteController.editarPacientePorId);

routes.delete("/pacientes/:id", PacienteController.deletarPacientePorId);

export default routes