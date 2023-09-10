import mongoose from "mongoose";
import { pacienteSchema } from "./Paciente";
import { medicoSchema } from "./Medico";

const historicoSchema = new mongoose.Schema({
    id: { type: String },
    paciente: pacienteSchema,
    medico: medicoSchema,
    dataEHora: {type: Date},
    diagnosticos: {type: Array},
    medicamentosPrescritos: {type: Array<string>}
}, {versionKey: false});

const historico = mongoose.model("historico", historicoSchema);

export {historico, historicoSchema};