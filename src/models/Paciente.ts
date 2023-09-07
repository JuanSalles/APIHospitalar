import { IPaciente } from "../interfaces/IPaciente"

export class Paciente{

    private name: string
    private id: number
    private historico: Historico[]
    private diagnosticosAnteriores: Diagnostico[]
    private consultasMarcadas: Consulta[]

    constructor(paciente: IPaciente){
        this.name = paciente.name
        this.id = paciente.id
        this.historico = paciente.historico
        this.diagnosticosAnteriores = paciente.diagnosticosAnteriores
        this.consultasMarcadas = paciente.consultasMarcadas
    }
}