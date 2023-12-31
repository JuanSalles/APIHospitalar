import mongoose from "mongoose";
import { pacienteSchema } from "./Paciente";
import { medicoSchema } from "./Medico";


const consultaSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    paciente: {type: Object},
    medico: medicoSchema,
    dataEHora: {type: Date},
    diagnosticos: {type: Array},
    medicamentosPrescritos: {type: Array<string>}
}, {versionKey: false});

const consulta = mongoose.model("consultasMarcadas", consultaSchema);

export {consulta, consultaSchema};