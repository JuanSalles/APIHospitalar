import { Horario } from "../interfaces/Horario"
import { IMedico } from "../interfaces/IMedico"

export class Medico{

    private name: string
    private registro: number
    private horario: Horario

    constructor(medico: IMedico){
        this.name = medico.name
        this.registro = medico.registro
        this.horario = medico.horario
    }
}