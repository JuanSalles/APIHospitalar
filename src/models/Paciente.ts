import mongoose from "mongoose"

const pacienteSchema = new mongoose.Schema ({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: {type: String, required: true},
    consultasMarcadas: {type: Array},
    diagnosticosAnteriores: {type: Array},
    historico: {type: Array}
}, {versionKey: false});

const paciente = mongoose.model("pacientes", pacienteSchema);

export {paciente, pacienteSchema};