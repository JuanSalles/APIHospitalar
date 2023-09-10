import mongoose from "mongoose"
import { Horario } from "../interfaces/Horario"


const medicoSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    name: {type: String, required: true},
    registroMedico: {type: Number},
    horarioDeTrabalho: {type: String}
}, {versionKey: false})

const medico = mongoose.model("medicos", medicoSchema);

export {medico, medicoSchema}